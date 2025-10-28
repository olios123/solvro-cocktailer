import React, { useState, useEffect } from "react";
import Glasses from "./Search/Glasses";
import Categories from "./Search/Categories";

interface FilterValues {
    search: string;
    alcoholic: "all" | "true" | "false";
    category: string;
    glass: string;
}

interface FilterProps {
    onFilterChange: (filters: FilterValues) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
    const [filters, setFilters] = useState<FilterValues>({
        search: "",
        alcoholic: "all",
        category: "",
        glass: "",
    });

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    return (
        <>
            <div className="search-input">
                <i className="fi fi-br-search"></i>

                <input
                    type="text"
                    placeholder="Search cocktails by name..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="border p-2 rounded flex-1"
                />

            </div>

            <div className="search-filter">
                <ol className="search-filter-options">
                    <li>
                        <i className="fi fi-sr-filter"></i>
                        <p>Filter by:</p>
                    </li>

                    {/* Alkohol */}
                    <li>
                        <p>Alcohol type:</p>
                        <div id="cocktail-alcohol">
                            {[
                                { label: "All", value: "all" },
                                { label: "Non-alcoholic", value: "false" },
                                { label: "Alcoholic", value: "true" },
                            ].map((opt) => (
                                <p
                                    key={opt.value}
                                    onClick={() =>
                                        setFilters({ ...filters, alcoholic: opt.value as any })
                                    }
                                    className={
                                        filters.alcoholic === opt.value
                                            ? "selected" : ""
                                    }
                                >
                                    {opt.label}
                                </p>
                            ))}
                        </div>
                    </li>

                    {/* Kategorie */}
                    <li>
                        <p>Cocktail type:</p>
                        <div id="cocktail-categories">
                            <Categories
                                onSelectCategory={(cat: string) =>
                                    setFilters({ ...filters, category: cat })
                                }
                            />
                        </div>
                    </li>

                    {/* Szkło */}
                    <li>
                        <p>Cocktail glass:</p>
                        <div id="cocktail-glasses">
                            <Glasses
                                onSelectGlass={(g: string) =>
                                    setFilters({ ...filters, glass: g })
                                }
                            />
                        </div>
                    </li>
                </ol>
            </div>
        </>
    );
}

