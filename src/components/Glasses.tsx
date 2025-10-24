import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Glasses() {
    const [glasses, setGlasses] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://cocktails.solvro.pl/api/v1/cocktails/glasses")
            .then(res => setGlasses(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {glasses.map((glass) => (
                <p>{glass}</p>
            ))}
        </>
    );
}

export default Glasses;
