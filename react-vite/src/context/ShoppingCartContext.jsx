import { useState, useContext, createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const ShoppingCartContext = createContext();
export const useShoppingCart = () => useContext(ShoppingCartContext);


export default function ShoppingCartProvider({children}) {
    // const [cartItems, setCartItems] = useState([]);
    const currentUser = useSelector(state => state.session.user);
    const userId = currentUser?.id
    console.log("userId=========", userId)

    // const localStorageKey = userId? `cartItems-${userId}` : 'cartItems';

    const [cartItems, setCartItems] = useState(() => {
        // const localData = localStorage.getItem('cartItems');
        const localData = localStorage.getItem('cartItems')
        return localData? JSON.parse(localData) : [];
    });

    useEffect(() => {
        // if (userId) {
        //     localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
        // }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
    }, [cartItems])

    // State initializer function to load cart items from local storage
    // const loadCartItems = () => {
    //     if (userId) {
    //         console.log(`Loading cart items for user ${userId} with key ${localStorageKey}`);
    //         const localData = userId? localStorage.getItem(localStorageKey):null;
    //         console.log(`Found data================ `, localData);
    //         return localData ? JSON.parse(localData) : [];
    //     }
    //     // return [];
    // };

    // const [cartItems, setCartItems] = useState(loadCartItems);

    // Update local storage whenever cartItems or userId changes
    // useEffect(() => {
    //     if (userId) {
    //         localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
    //     }
    // }, [cartItems, userId, localStorageKey]);

    // Effect to clear cartItems when user logs out (userId becomes undefined)
    // bc userId is depended on redux, when first render the userId is undefined, so refresh will trigger this effect
    // useEffect(() => {
    //     if (userId === undefined) {
    //         setCartItems([]);
    //     }
    // }, [userId]);



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