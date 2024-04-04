import { useShoppingCart } from "../../context/ShoppingCartContext";
import CheckoutItem from "../CheckoutItem";
import { useDispatch } from "react-redux";
import { checkoutThunk } from "../../redux/shopping-cart";
import "./CheckoutPage.css"

function CheckoutPage() {
    const { cartItems, setCartItems } = useShoppingCart();
    const dispatch = useDispatch();
    // console.log('cartItems=========', cartItems)

    const subtotal = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    const formattedSubtotal = subtotal.toFixed(2);

    const placeOrderClick = async(e) => {
        e.preventDefault();
        await dispatch(checkoutThunk(cartItems));
        // setCartItems([]);
    }



    return (
        <div className="checkout-page">
            <h1 className="checkout-page-h1">Shopping Cart</h1>
            
            {cartItems?.map((item,index) => (
                <div key={index} className="checkout-page-whole-container">
                    <CheckoutItem item={item}/>
                </div>
            ))}
            <div className="subtotal-place-order-container">
                <p className="subtotal-p">Subtotal: ${formattedSubtotal}</p>
                <button
                    onClick={placeOrderClick}
                    className="place-order-button">Place Order</button>
            </div>
        </div>
    )
}

export default CheckoutPage;