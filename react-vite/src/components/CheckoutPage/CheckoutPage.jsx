import { useShoppingCart } from "../../context/ShoppingCartContext";
import CheckoutItem from "../CheckoutItem";
import "./CheckoutPage.css"

function CheckoutPage() {
    const { cartItems, setCartItems } = useShoppingCart();
    console.log('cartItems=========', cartItems)

    const subtotal = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    const formattedSubtotal = subtotal.toFixed(2);



    return (
        <div>
            <h1 className="checkout-page-h1">Shopping Cart</h1>
            
            {cartItems?.map((item,index) => (
                <div key={index} className="checkout-page-whole-container">
                    <CheckoutItem item={item}/>
                </div>
            ))}
            <div className="subtotal-place-order-container">
                <p className="subtotal-p">Subtotal: ${formattedSubtotal}</p>
                <button className="place-order-button">Place Order</button>
            </div>
        </div>
    )
}

export default CheckoutPage;