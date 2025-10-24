import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';

// Components
import App from './components/App';
import Glasses from './components/Glasses';
import Categories from './components/Categories';

import reportWebVitals from './reportWebVitals';

// Main cocktails list
const app = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
    // <App />
);

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

// If you want to start measuring performance in your components, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
