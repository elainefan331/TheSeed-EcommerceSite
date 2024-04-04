import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";


function ShoppingCart() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate();

    const { cartItems, setCartItems } = useShoppingCart();
    // console.log('cartItems=========', cartItems)

    
    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    
    
    
    const closeMenu = () => setShowMenu(false);

    const increaseButtonClick = (e, targetItem) => {
        e.preventDefault();
        const existingItem = cartItems.find(item => item.productId === targetItem.productId);
        if(existingItem) {
            const updatedCartItems = cartItems.map(item => (
                item.productId === targetItem.productId? {...item, quantity: item.quantity + 1 } : item
            ));
            setCartItems(updatedCartItems);
        } else {
            return;
        }
    }

    const decreaseButtonClick = (e, targetItem) => {
        e.preventDefault();
        const existingItem = cartItems.find(item => item.productId === targetItem.productId);
        // console.log('targetItem========', targetItem)
        // console.log('existingItem=======', existingItem)
        
        if(existingItem) {
            if(existingItem.quantity === 1) {
                const updatedCartItems = cartItems.filter(item => item.productId !== targetItem.productId);
                setCartItems(updatedCartItems);
            } else {
                const updatedCartItems = cartItems.map(item => (
                    item.productId === targetItem.productId && item.quantity > 1? {...item, quantity: item.quantity - 1 } : item
                ));
                setCartItems(updatedCartItems);
            }
        } 
    }

    const checkoutButtonClick = (e) => {
        e.preventDefault();
        closeMenu();
        navigate('/products/checkout')
    }


    return (
        <div
            // onMouseLeave={closeMenu}
        >
        <button 
            // onClick={toggleMenu} 
            onMouseEnter={toggleMenu}
            className='shopping-cart-button'
        >
            <div>
                <i className="fa-solid fa-cart-shopping" style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}></i>
            </div>
        </button>
      
        {showMenu && (
            <ul className={"shopping-cart-dropdown"} ref={ulRef}>
                <h1>your shopping cart</h1>
                {cartItems?.map((item, index) => (
                    <p key={index}>name: {item.productName} | price: {item.productPrice} | quantity: {item.quantity}
                        <button
                            onClick={(e) => increaseButtonClick(e, item)}
                        > 
                            + 
                        </button>
                        <button
                            onClick={(e) => decreaseButtonClick(e, item)}
                        > 
                            - 
                        </button>
                    </p>

                ))}
                <button onClick={checkoutButtonClick}>Go Checkout</button>
            </ul>
        )}
        </div>
    )
}

export default ShoppingCart;