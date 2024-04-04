import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./CheckoutItem.css"

function CheckoutItem({item}) {
    const { cartItems, setCartItems } = useShoppingCart();
    console.log('cartItems=========', cartItems)

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

    return (
        <div className="checkout-page-item-container">
            <img className="checkout-item-image" src={item?.productImage} />
            <div className="checkout-item-p-container">
                <p>{item?.productName}</p>
            </div>
            <div className="checkout-item-p-container">
                <p>${item?.productPrice}</p>
            </div>
            <div className="checkout-item-button-container">
                <button
                    onClick={(e) => increaseButtonClick(e, item)}
                >+</button>
                <div className="checkout-item-quantity-container">
                    <p>{item?.quantity}</p>
                </div>
                <button
                    onClick={(e) => decreaseButtonClick(e, item)}
                >-</button>
            </div>
        </div>
    )
}

export default CheckoutItem;