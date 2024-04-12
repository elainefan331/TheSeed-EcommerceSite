import { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";


function ShoppingCart() {
    const [showMenu, setShowMenu] = useState(false);
    // const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate();

    const { cartItems, setCartItems } = useShoppingCart();
    // console.log('cartItems=========', cartItems)

    const subtotal = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    const formattedSubtotal = subtotal.toFixed(2);

    
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
            onClick={toggleMenu} 
            // onMouseEnter={toggleMenu}
            className='shopping-cart-button'
        >
            <div>
                <i className="fa-solid fa-cart-shopping" style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}></i>
            </div>
        </button>
      
        {showMenu ? (
            <ul className={"shopping-cart-dropdown shopping-cart-dropdown-visible"} ref={ulRef}>
                <div className="shopping-cart-h1-and-x">
                    <h1>shopping cart</h1>
                    <i onClick={closeMenu} className="fa-solid fa-xmark"></i>
                </div>
                {cartItems?.length !== 0 ?(
                <>
                <div className="shopping-cart-items-column-container">
                    <span>Product</span>
                    <span className="shopping-cart-price-column-span">Unit Price</span>
                    <span className="shopping-cart-buttons-column-span">Qty</span>
                </div>
                {cartItems?.map((item, index) => (
                    <div key={index} className="shopping-cart-items-container">
                        <span>{item?.productName}</span>
                        <span id="shopping-cart-price-span">${item?.productPrice}</span>
                        <span id="shopping-cart-buttons-span">
                            <button
                                onClick={(e) => increaseButtonClick(e, item)}
                            > 
                                + 
                            </button>
                            <span id="shopping-cart-quantity-span">{item?.quantity}</span>
                            <button
                                onClick={(e) => decreaseButtonClick(e, item)}
                            > 
                                - 
                            </button>
                        </span>
                    </div>

                ))}
                <p>Subtotal: ${formattedSubtotal}</p>
                <button
                    className="shopping-cart-checkout-button" 
                    onClick={checkoutButtonClick}>Go Checkout
                </button>
                </>) : <h4><i className="fa-solid fa-leaf"></i> your cart is empty</h4>}
            </ul>
        ): <ul className={"shopping-cart-dropdown shopping-cart-dropdown-hidden"} ref={ulRef}>
                <div className="shopping-cart-h1-and-x">
                    <h1>shopping cart</h1>
                    <i onClick={closeMenu} className="fa-solid fa-xmark"></i>
                </div>
                {cartItems?.length !== 0 ?(
                <>
                <div className="shopping-cart-items-column-container">
                    <span>Product</span>
                    <span className="shopping-cart-price-column-span">Unit Price</span>
                    <span className="shopping-cart-buttons-column-span">Qty</span>
                </div>
                {cartItems?.map((item, index) => (
                    <div key={index} className="shopping-cart-items-container">
                        <span>{item?.productName}</span>
                        <span id="shopping-cart-price-span">${item?.productPrice}</span>
                        <span id="shopping-cart-buttons-span">
                            <button
                                onClick={(e) => increaseButtonClick(e, item)}
                            > 
                                + 
                            </button>
                            <span id="shopping-cart-quantity-span">{item?.quantity}</span>
                            <button
                                onClick={(e) => decreaseButtonClick(e, item)}
                            > 
                                - 
                            </button>
                        </span>
                    </div>

                ))}
                <p>Subtotal: ${formattedSubtotal}</p>
                <button
                    className="shopping-cart-checkout-button" 
                    onClick={checkoutButtonClick}>Go Checkout
                </button>
                </>) : <h4><i className="fa-solid fa-leaf"></i> your cart is empty</h4>}
            </ul>}
        </div>
    )
}

export default ShoppingCart;