import { useState, useContext, createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const ShoppingCartContext = createContext();
export const useShoppingCart = () => useContext(ShoppingCartContext);


export default function ShoppingCartProvider({children}) {
    // const [cartItems, setCartItems] = useState([]);
    const currentUser = useSelector(state => state.session.user);
    const userId = currentUser?.id
    // const localStorageKey = userId? `cartItems-${userId}` :'cartItems-guest';

    const [cartItems, setCartItems] = useState(() => {
        // const localData = localStorage.getItem(localStorageKey)

        const localData = localStorage.getItem('cartItems')
        return localData? JSON.parse(localData) : [];
    });

    

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // if(userId) {
        //     localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
        // }
    }, [cartItems])


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