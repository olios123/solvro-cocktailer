import React, { useState, useEffect, useRef } from 'react';
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

// Ingredient structure
interface Ingredient {

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

interface CocktailsListProps {
    // Favourites cocktails
    showFavourites: boolean;
    favourites: Cocktail[];
    onToggleFavourite: (cocktail: Cocktail) => void;
}

export default function CocktailsList({
    showFavourites, favourites, onToggleFavourite,
}: CocktailsListProps)
{
    // Loading and displaying cocktails
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    // Meta data from API
    const [meta, setMeta] = useState<Meta | null>(null);
    // Setting and displaying pages
    const [page, setPage] = useState<number>(1);
    // Loading state for temporary UI objects
    const [loading, setLoading] = useState(true);
    // State to display content that is ready to show
    const [contentReady, setContentReady] = useState(false);
    // Fetching errors
    const [error, setError] = useState<string | null>(null);

    // Filter options
    const [filters, setFilters] = useState({
        favourite: false,
        favouriteList: [],
        search: "",
        alcoholic: "all",
        category: "",
        glass: "",
    });

    const firstLoadRef = useRef(true); // 👈 dodaj to nad useEffect

    useEffect(() => {
        // Don't call for API if showing favourites
        if (showFavourites)
        {
            setLoading(false);
            setContentReady(true);
            return;
        }

        // Loading state only for the first open of the page
        const isFirstLoad = firstLoadRef.current;
        if (isFirstLoad) {
            setLoading(true);
            setContentReady(false);
        }

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

                // Wait for all images to load
                const images = res.data.data.map((c: any) => c.imageUrl);
                Promise.all(
                    images.map(
                        (src: string) =>
                            new Promise((resolve) => {
                                const img = new Image();
                                img.src = src;
                                img.onload = resolve;
                                img.onerror = resolve;
                            })
                    )
                ).then(() => {
                    setContentReady(true);
                });
            })
            .catch(err => setError("Cannot load cocktails"))
            .finally(() => {
                setLoading(false);
                firstLoadRef.current = false;
            })
    }, [filters, page]);

    // If loading state or content is preparing to display
    if (loading || !contentReady) return (
        <main className="loading">
            <div className="banner">
            </div>
            <div className="search"></div>
            <div className="cocktails-list" current-page={page}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <article key={i} className="cocktail loading"></article>
                ))}
            </div>
        </main>

    );
    if (error) return <div>Error: {error}</div>; // Display error
    if (!meta) return null; // Broken data

    // Decide with one of the cocktails will be visible
    // const visibleList = showIngredients || showFavourites || cocktails;
    const visibleCocktails = showFavourites ? favourites : cocktails;

    return (
        <main>
            <div className="banner">
                {showFavourites ? (
                    <h1>
                        Your Favourite Cocktails
                        <i className="fi fi-sr-heart"></i>
                    </h1>
                ) : (
                    <h1>Explore Our Oocktails!</h1>
                )}
                <p>{showFavourites ?
                    `Below You can find all cocktails that you liked.` :
                    `Browse our catalog of various cocktails. There's something for everyone.`
                }</p>
            </div>


            {/* Disable filters for list of favourite cocktails */}
            {!showFavourites && (
                <div className="search">
                    <Filter onFilterChange={setFilters}/>
                </div>
            )}

            {/* Checking if there are any cocktails */}
            {visibleCocktails.length > 0 ? (
                <div className="cocktails-list" current-page={page}>
                    {visibleCocktails.map((cocktail) => (
                        <Cocktail
                            key={cocktail.id}
                            cocktail={cocktail}
                            isFavourite={favourites.some(f => f.id === cocktail.id)}
                            onToggleFavourite={() => onToggleFavourite(cocktail)}
                        />
                    ))}
                </div>
            ) : (
                <div className="cocktails-list-empty">
                    <div className="no-cocktails">
                        <i className="fi fi-sr-wine-glass-crack"></i>
                        <p>No cocktails found :(</p>
                    </div>
                </div>
            )}

            {/* Don't make pages of favourite cocktails */}
            {!showFavourites && meta && <Pages meta={meta} onChangePage={setPage} />}
        </main>
    );
}
