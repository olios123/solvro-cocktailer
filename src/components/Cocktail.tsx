import React from 'react';
import '../styles/cocktail.scss'
// import './App.css';

interface CocktailProps {
    cocktail: {
        id: number;
        name: string;
        category: string;
        glass: string;
        instructions: string;
        imageUrl: string;
        alcoholic: boolean;
        createdAt: string;
        updatedAt: string;
    };
    isFavourite?: boolean;
    onToggleFavourite?: (cocktail: any) => void;
}

/**
 * Creating cocktail tile with provided info about it
 * @param props - cocktail data from API
 * @constructor
 */
export default function Cocktail({ cocktail, isFavourite, onToggleFavourite }: CocktailProps) {
    return (
        <article className="cocktail" key={cocktail.id}>
            <div className="cocktail-background">
                <img
                    src={cocktail.imageUrl}
                    alt={cocktail.name}
                />

                {cocktail.alcoholic ? (
                    <div className="cocktail-type cocktail-alcoholic">
                        <i className="fi fi-sr-glass-champagne"></i>
                        <p>Alcoholic</p>
                    </div>
                ) : (
                    <div className="cocktail-type cocktail-non-alcoholic">
                        <i className="fi fi-sr-shield-check"></i>
                        <p>Non-alcoholic</p>
                    </div>
                )}

                {/* Favourites */}
                <div
                    className={`cocktail-favourite ${isFavourite ? "selected" : ""}`}
                    onClick={() => onToggleFavourite && onToggleFavourite(cocktail)}
                >
                    <i className={isFavourite ? "fi fi-sr-heart" : "fi fi-br-heart"}></i>
                </div>
            </div>

            <div className="cocktail-content">
                <h2 className="cocktail-name">{cocktail.name}</h2>
                <ol className="cocktail-info">
                    <li>{cocktail.category}</li>
                    <li>{cocktail.glass}</li>
                </ol>
                <p className="cocktail-description">{cocktail.instructions}</p>
            </div>
        </article>
    );
}