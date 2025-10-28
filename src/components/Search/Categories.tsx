// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// interface CategoriesProps {
//     onSelectCategory: (category: string) => void;
// }
//
// function Categories({ onSelectCategory }: CategoriesProps) {
//     const [categories, setCategories] = useState<string[]>([]);
//     const [active, setActive] = useState<string>("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         axios.get("https://cocktails.solvro.pl/api/v1/cocktails/categories")
//             .then(res => setCategories(res.data.data))
//             .catch(err => console.log(err))
//             .finally(() => setLoading(false));
//     }, []);
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//
//     return (
//         <>
//             {categories.map((category) => (
//                 <p key={category}>{category}</p>
//             ))}
//         </>
//     );
// }
//
// export default Categories;

import React, { useEffect, useState } from "react";
import axios from "axios";

interface CategoriesProps {
    onSelectCategory: (category: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        axios.get("https://cocktails.solvro.pl/api/v1/cocktails/categories")
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err))
            // .finally(() => setLoading(false));
    }, []);


    return (
        <>
            {categories.map((category) => (
                <p
                    key={category}
                    onClick={() => {
                        if (active == category) {
                            setActive("");
                            onSelectCategory("");
                        } else {
                        setActive(category);
                        onSelectCategory(category);
                        }
                    }}
                    className={`${
                        active === category
                            ? "selected" : ""
                    }`}
                >
                    {category}
                </p>
            ))}
        </>
    );
}

