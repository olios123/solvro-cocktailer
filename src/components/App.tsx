import React, {useState, useEffect} from 'react';
import CocktailsList from "./CocktailsList";
import Header from "./Header";
import Footer from "./Footer";

export default function App()
{
    // Manging favourite cocktails
    const [favourites, setFavourites] = useState<any[]>([]);
    // Changing state normal/favourites
    const [showFavourites, setShowFavourites] = useState(false);

    // Read favourite cocktails from local storage
    useEffect(() => {
        const stored = localStorage.getItem("favouriteCocktails");
        if (stored) setFavourites(JSON.parse(stored));
    }, []);

    // Saving favourites to local storage
    useEffect(() => {
        localStorage.setItem("favouriteCocktails", JSON.stringify(favourites));
    }, [favourites]);

    // Function to handle toggling favourite cocktails
    const toggleFavourite = (cocktail: any) => {
        setFavourites((prev) => {
            const exists = prev.find((c) => c.id === cocktail.id);
            return exists
                ? prev.filter((c) => c.id !== cocktail.id)
                : [...prev, cocktail];
        });
    };

    return (
        <>
            <Header
                showFavourites={showFavourites}
                onToggleFavourites={() => setShowFavourites((prev) => !prev)}
            />
            <CocktailsList
                showFavourites={showFavourites}
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
            />
            <Footer />
        </>
    )
}