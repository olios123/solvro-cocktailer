import React from 'react';
import '../styles/cocktail.scss'
// import './App.css';


function Cocktail(props: { cocktail: {
    id: number;
    name: string;
    category: string;
    glass: string;
    instructions: string;
    imageUrl: string;
    alcoholic: boolean;
    createdAt: string;
    updatedAt: string;
}}) {
    return (
        <article className="cocktail">
            <div className="cocktail-background">
                <img
                    src={props.cocktail.imageUrl}
                    alt={props.cocktail.name}
                />
            </div>
            <h2 className="cocktail-name">{props.cocktail.name}</h2>
        </article>
    );
}

export default Cocktail;
