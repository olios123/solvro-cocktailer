import React from "react";

interface HeaderProps {
    showFavourites: boolean;
    onToggleFavourites: () => void;
}

export default function Header({ showFavourites, onToggleFavourites }: HeaderProps) {
    return (
        <header>
            <div className="logo">
                <i className="fi fi-sr-martini-glass-citrus"></i>
                <div className="logo-content">
                    <h2>Solvro Cocktailer</h2>
                    <p>Discover your favourite cocktails</p>
                </div>
            </div>
            <button
                className={`favourites ${showFavourites ? "selected" : ""}`}
                onClick={onToggleFavourites}
            >
                <i className="fi fi-sr-heart"></i>
                <p>Favourites</p>
            </button>
        </header>

    );
}

