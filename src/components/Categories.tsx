import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Categories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://cocktails.solvro.pl/api/v1/cocktails/categories")
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {categories.map((category) => (
                <p>{category}</p>
            ))}
        </>
    );
}

export default Categories;
