import React, { useEffect, useState } from "react";
import axios from "axios";

interface CategoriesProps {
    onSelectCategory: (category: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
    // Setting and reading categories
    const [categories, setCategories] = useState<string[]>([]);
    // Defining with of current categories filter are active
    const [active, setActive] = useState<string>("");

    // GET from Solvro API - categories of cocktails
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
                        // If active category is clicked disable it
                        if (active == category) {
                            setActive("");
                            onSelectCategory("");
                        } else { // Otherwise enable it
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

