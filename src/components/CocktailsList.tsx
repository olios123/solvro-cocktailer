import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cocktail from './Cocktail';
import Pages from "./Pages";

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

    useEffect(() => {
        setLoading(true);
        axios.get(`https://cocktails.solvro.pl/api/v1/cocktails?page=${page}`)
            .then(res => {
                setCocktails(res.data.data);
                setMeta(res.data.meta);
            })
            .catch(err => setError("Cannot load cocktails"))
            .finally(() => setLoading(false));
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!meta) return null;

    return (
        <>
            <div className="cocktails-list" current-page={page}>
                {cocktails.map((cocktail) => (
                    <Cocktail key={cocktail.id} cocktail={cocktail}/>
                ))}
            </div>

            <Pages meta={meta} onChangePage={setPage} />
        </>
    );
}
