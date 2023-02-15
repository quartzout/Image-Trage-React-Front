import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootswatch/dist/darkly/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Auth/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>

);
