import { useShoppingCart } from "../../context/ShoppingCartContext";
import CheckoutItem from "../CheckoutItem";
import { useDispatch } from "react-redux";
import { checkoutThunk } from "../../redux/shopping-cart";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css"

function CheckoutPage() {
    const { cartItems, setCartItems } = useShoppingCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const subtotal = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    const formattedSubtotal = subtotal.toFixed(2);

    const placeOrderClick = async(e) => {
        e.preventDefault();
        await dispatch(checkoutThunk(cartItems));
        setCartItems([]);
        navigate('/orders')
    }

    const goShoppingClick = (e) => {
        e.preventDefault();
        navigate('/');
    }



    return (
        <div className="checkout-page">
            <h1 className="checkout-page-h1">Shopping Cart</h1>
            {subtotal ===0? <p className="checkout-page-cart-empty-text"><i className="fa-solid fa-leaf"></i> Your cart is empty</p> : null}
            {subtotal ===0? <p className="go-shopping-p" onClick={goShoppingClick}>Go shopping <i className="fa-solid fa-arrow-right"></i></p> : null}
            
            {cartItems?.map((item,index) => (
                <div key={index} className="checkout-page-whole-container">
                    <CheckoutItem item={item}/>
                </div>
            ))}
            <div className="subtotal-place-order-container">
                <p className="subtotal-p">Subtotal: ${formattedSubtotal}</p>
                <button
                    disabled={subtotal === 0}
                    onClick={placeOrderClick}
                    className={subtotal === 0? "place-order-button-disable": "place-order-button-active"}
                >Place Order</button>
            </div>
        </div>
    )
}

export default CheckoutPage;