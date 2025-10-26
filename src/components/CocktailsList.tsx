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
            .catch(err => setError("Nie udało się pobrać koktajli 😞"))
            .finally(() => setLoading(false));
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!meta) return null;

    return (
        <>
            <div current-page={page}>
                {cocktails.map((cocktail) => (
                    <Cocktail key={cocktail.id} cocktail={cocktail}/>
                ))}
            </div>

            <Pages meta={meta} onChangePage={setPage} />
        </>
        // <div className="p-6">
        //     <h1 className="text-2xl font-bold mb-4">Lista koktajli</h1>
        //
        //     {/* Lista koktajli */}
        //     <ul className="grid grid-cols-2 gap-4">
        //         {cocktails.map((cocktail) => (
        //             <li key={cocktail.id} className="p-3 border rounded shadow-sm">
        //                 <img
        //                     src={cocktail.imageUrl}
        //                     alt={cocktail.name}
        //                     className="w-full rounded"
        //                 />
        //                 <p className="mt-2 font-semibold">{cocktail.name}</p>
        //             </li>
        //         ))}
        //     </ul>
        //
        //     {/* Komponent paginacji */}
        //     <Pages meta={meta} onChangePage={setPage} />
        //
        //     <p className="mt-3 text-sm text-gray-600">
        //         Strona {meta.currentPage} z {meta.lastPage} ({meta.total} koktajli)
        //     </p>
        // </div>
        // <div>
        //     {cocktails.map((cocktail) => (
        //         <Cocktail cocktail={cocktail}/>
        //     ))}
        // </div>
    );
}
