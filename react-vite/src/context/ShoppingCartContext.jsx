import { useState, useContext, createContext } from "react";

export const ShoppingCartContext = createContext();

export const useShoppingCart = () => useContext(ShoppingCartContext);


export default function ShoppingCartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);

    return (
        <ShoppingCartContext.Provider
            value={{
                cartItems,
                setCartItems
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}