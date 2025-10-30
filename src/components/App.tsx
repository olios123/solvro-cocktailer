import React from 'react';
import CocktailsList from "./CocktailsList";
import Header from "./Header";
import Footer from "./Footer";

export default function App()
{
    return (
        <>
            <Header />
            <CocktailsList />
            <Footer />
        </>
    )
}