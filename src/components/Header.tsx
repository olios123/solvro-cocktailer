import React from "react";


export default function Header() {
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
                className="favourites"
                // onClick={} // TODO change displayed state normal/favourites
            >
                <i className="fi fi-sr-heart"></i>
                {}
                <p>Favourites</p>
            </button>
        </header>

    );
}

