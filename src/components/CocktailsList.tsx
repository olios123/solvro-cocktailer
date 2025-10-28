import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cocktail from "./Cocktail";
import Pages from "./Pages";
import Filter from "./Filter";

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
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter
    const [filters, setFilters] = useState({
        search: "",
        alcoholic: "all",
        category: "",
        glass: "",
    });

    useEffect(() => {
        setLoading(true);

        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (filters.search) params.append("name", filters.search);
        if (filters.category) params.append("category", filters.category);
        if (filters.glass) params.append("glass", filters.glass);
        if (filters.alcoholic !== "all")
            params.append("alcoholic", filters.alcoholic);

        axios
            .get(`https://cocktails.solvro.pl/api/v1/cocktails?${params.toString()}`)
            .then(res => {
                setCocktails(res.data.data);
                setMeta(res.data.meta);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (error) return <div>Error: {error}</div>;
    if (!meta) return null;

    return (
        <>
            <div className="search">
                <Filter onFilterChange={setFilters} />
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

            <Pages meta={meta} onChangePage={setPage} />
        </>
    );
}
