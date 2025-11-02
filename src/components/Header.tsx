import React from "react";

interface HeaderProps {
    // Favourites
    showFavourites: boolean;
    onToggleFavourites: () => void;
    // Ingredients
    showIngredients: boolean,
    onToggleIngredients: () => void
}

export default function Header({
    showFavourites, onToggleFavourites, // Favourites cocktails
    showIngredients, onToggleIngredients // Ingredients of all cocktails
}: HeaderProps) {
    return (
        <header>
            <a className="logo" href="#">
                <i className="fi fi-sr-martini-glass-citrus"></i>
                <div className="logo-content">
                    <h2>Solvro Cocktailer</h2>
                    <p>Discover your favourite cocktails</p>
                </div>
            </a>
            <div className="right-sec">
                <button
                    className={`ingredients ${showIngredients ? "selected" : ""}`}
                    onClick={onToggleIngredients}
                >
                    <i className="fi fi-sr-bottle"></i>
                    <p>Ingredients</p>
                </button>
                <button
                    className={`favourites ${showFavourites ? "selected" : ""}`}
                    onClick={onToggleFavourites}
                >
                    <i className="fi fi-sr-heart"></i>
                    <p>Favourites</p>
                </button>
            </div>
        </header>

    );
}

