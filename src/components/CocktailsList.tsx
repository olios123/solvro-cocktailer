import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cocktail from "./Cocktail";
import Pages from "./Pages";
import Filter from "./Filter";

// Cocktail structure
interface Cocktail {
    id: number;
    name: string;
    category: string;
    glass: string;
    instructions: string;
    imageUrl: string;
    alcoholic: boolean;
    createdAt: string;
    updatedAt: string;
}

// API call meta structure
interface Meta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
}


export default function CocktailsList() {
    // Loading and displaying cocktails
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    // Meta data from API
    const [meta, setMeta] = useState<Meta | null>(null);
    // Setting and displaying pages
    const [page, setPage] = useState<number>(1);
    // Loading state for temporary UI objects
    const [loading, setLoading] = useState(true);
    // Fetching errors
    const [error, setError] = useState<string | null>(null);

    // Filter options
    const [filters, setFilters] = useState({
        search: "",
        alcoholic: "all",
        category: "",
        glass: "",
    });

    useEffect(() => {
        setLoading(true); // Loading until finall response from API

        // Converting data to URL params
        // Checking if every param is not empty (if empty = default)
        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (filters.search) params.append("name", filters.search);
        if (filters.category) params.append("category", filters.category);
        if (filters.glass) params.append("glass", filters.glass);
        if (filters.alcoholic !== "all")
            params.append("alcoholic", filters.alcoholic);

        // GET from Solvro API
        axios
            .get(`https://cocktails.solvro.pl/api/v1/cocktails?${params.toString()}`)
            .then(res => {
                // Returning response cocktails and meta
                setCocktails(res.data.data);
                setMeta(res.data.meta);
            })
            .catch(err => setError("Cannot load cocktails"))
            .finally(() => setLoading(false));
    }, [filters, page]);

    // if (loading) return (
    //     <div className="cocktails-list" current-page={page}>
    //         {Array.from({ length: 15 }).map((_, i) => (
    //             <article key={i} className="cocktail loading"></article>
    //         ))}
    //     </div>
    // );
    if (error) return <div>Error: {error}</div>; // Display error
    if (!meta) return null; // Broken data

    return (
        <main>
            <div className="banner">
                <h1>Explore Our Oocktails!</h1>
                <p>Browse our catalog of various cocktails. There's something for everyone.</p>
            </div>
            <div className="search">
                <Filter onFilterChange={setFilters}/>
            </div>
            {cocktails.length > 0 ? (
                <div className="cocktails-list" current-page={page}>
                    {cocktails.map((cocktail) => (
                        <Cocktail key={cocktail.id} cocktail={cocktail}/>
                    ))}
                </div>
            ) : (
                <div className="cocktails-list empty" current-page={page}>
                    <div className="no-cocktails">
                        <i className="fi fi-sr-wine-glass-crack"></i>
                        <p>No cocktails found :(</p>
                    </div>
                </div>
            )}

            {/*TODO favourite cocktails*/}

            <Pages meta={meta} onChangePage={setPage}/>
        </main>
    );
}
