import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const app = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

    // <App />
);

// If you want to start measuring performance in your components, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
