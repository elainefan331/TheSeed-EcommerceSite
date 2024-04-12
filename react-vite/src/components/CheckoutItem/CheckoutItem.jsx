import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useNavigate, Link } from "react-router-dom";
import "./CheckoutItem.css"

function CheckoutItem({item}) {
    const { cartItems, setCartItems } = useShoppingCart();
    const navigate = useNavigate();
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

    const removeButtonClick = (e, targetItem) => {
        e.preventDefault();
        const existingItem = cartItems.find(item => item.productId === targetItem.productId);
        if (existingItem) {
            const updatedCartItems = cartItems.filter(item => item.productId !== targetItem.productId);
            setCartItems(updatedCartItems);
        } else {
            return;
        }
    }

    const checkoutItemImageClick = (e, productId) => {
        e.preventDefault();
        navigate(`/products/${productId}`)
    }

    const itemSubtotal = item?.productPrice * item?.quantity;
    const formattedItemSubtotal = itemSubtotal.toFixed(2);

    return (
        <div className="checkout-page-item-card">
            <img className="checkout-item-image" src={item?.productImage} onClick={(e) => checkoutItemImageClick(e, item?.productId)}/>
            <div className="checkout-item-p-container">
                <Link className="checkout-item-link" to={`/products/${item?.productId}`}>{item?.productName}</Link>
            </div>
            <div className="checkout-item-p-container checkout-item-unit-price-container">
                <p>${item?.productPrice} / per item</p>
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
            <button
                className="checkout-item-remove-button"
                onClick={(e) => removeButtonClick(e, item)}    
            >remove</button>
            <p className="checkout-item-itemSubtotal-p">${formattedItemSubtotal}</p>
        </div>
    )
}

export default CheckoutItem;