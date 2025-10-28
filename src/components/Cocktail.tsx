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
        <article className="cocktail" key={props.cocktail.id}>
            <div className="cocktail-background">
                <img
                    src={props.cocktail.imageUrl}
                    alt={props.cocktail.name}
                />
                {props.cocktail.alcoholic ? (
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
                <div className="cocktail-favourite">
                    <i className="fi fi-br-heart"></i>
                </div>
            </div>
            <div className="cocktail-content">
                <h2 className="cocktail-name">{props.cocktail.name}</h2>
                <ol className="cocktail-info">
                    <li>{props.cocktail.category}</li>
                    <li>{props.cocktail.glass}</li>
                </ol>
                <p className="cocktail-description">{props.cocktail.instructions}</p>
            </div>
        </article>
    );
}

export default Cocktail;
