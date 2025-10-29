import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import './styles/responsive.scss';

// Components
import CocktailsList from './components/CocktailsList';

import reportWebVitals from './reportWebVitals';

// Main cocktails list
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
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
