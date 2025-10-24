import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cocktail from './Cocktail';
// import logo from '../logo.svg';
// import './App.css';

interface CK {
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

function App() {
    const [cocktails, setCocktails] = useState<CK[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://cocktails.solvro.pl/api/v1/cocktails")
            .then(res => setCocktails(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {cocktails.map((cocktail) => (
                <Cocktail cocktail={cocktail}/>
            ))}

            {/*{cocktails.map((cocktail) => (*/}
            {/*    <div key={cocktail.id} style={{ marginBottom: '20px' }}>*/}
            {/*        <h2>{cocktail.name}</h2>*/}
            {/*        <p><strong>Kategoria:</strong> {cocktail.category}</p>*/}
            {/*        <p><strong>Instrukcje:</strong> {cocktail.instructions}</p>*/}
            {/*        <img*/}
            {/*            src={cocktail.imageUrl}*/}
            {/*            alt={cocktail.name}*/}
            {/*            width="150"*/}
            {/*            style={{ borderRadius: '8px' }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
}

export default App;
