import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';

// Components
import CocktailsList from './components/CocktailsList';
import Glasses from './components/Glasses';
import Categories from './components/Categories';
import Pages from './components/Pages';

import reportWebVitals from './reportWebVitals';

// Glasses list
const glasses = ReactDOM.createRoot(
    document.getElementById('cocktail-glasses') as HTMLElement
);
glasses.render(
    <Glasses/>
)

// Categories list
const categories = ReactDOM.createRoot(
    document.getElementById('cocktail-categories') as HTMLElement
);
categories.render(
    <Categories/>
)

// Main cocktails list
const cocktailsList = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
);
cocktailsList.render(
    <React.StrictMode>
        <CocktailsList />
    </React.StrictMode>
    // <App />
);

// // Pages list
// const pagesList = ReactDOM.createRoot(
//     document.getElementById('pages-list') as HTMLElement
// )
// pagesList.render(
//     <Pages />
// )

// If you want to start measuring performance in your components, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
