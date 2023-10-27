import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    //*****getting item form localstorage start ******
    useEffect(()=>{
        let exitingCartItem = localStorage.getItem('cart');
        if(exitingCartItem) setCart(JSON.parse(exitingCartItem))
    },[])
    //*****getting item from localstorage end here ******

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
}


//custom hooks
const useCart = () => useContext(CartContext)

export {useCart, CartProvider};