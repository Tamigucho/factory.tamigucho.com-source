import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'; // Importing Bootstrap Material Design CSS
import './styles/theme.css'; // Importing custom theme styles

// Initialize the root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
