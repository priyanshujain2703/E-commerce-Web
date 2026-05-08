import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { StoreProvider } from './context/StoreContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={2800}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
