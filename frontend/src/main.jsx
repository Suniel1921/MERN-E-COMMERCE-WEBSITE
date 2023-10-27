import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/auth.jsx'
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
    <SearchProvider>
    <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </CartProvider>
    </SearchProvider>
    </UserProvider>




)
