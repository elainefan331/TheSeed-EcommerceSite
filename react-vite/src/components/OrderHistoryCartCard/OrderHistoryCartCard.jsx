import { Link } from "react-router-dom";
import "./OrderHistoryCartCard.css"

function OrderHistoryCartCard({cart}) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    return (
        <div className="history-cart-card">
            <div className="order-number-date-container">
                <h2>Order Number: #000{cart?.id}</h2>
                <span>Ordered on {formatDate(cart?.created_at)}</span>
            </div>
            <h3>Subtotal: ${cart?.total_price}</h3>
            {cart.items?.map((item, index) => {
                return (
                    <div key={index} className="history-cart-card-info-container">
                        <img src={item.product?.image} style={{width: "100px", height: "100px"}} />
                        <p className="history-cart-item-p">{item.product?.name}</p>
                        <p className="history-cart-item-p">${item.product?.price} / per item</p>
                        <p className="history-cart-item-p">Qty: {item?.quantity}</p>
                        <div>
                            <button className="buy-again-button"><Link className="buy-again-link" to={`/products/${item?.product_id}`}>buy again</Link></button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderHistoryCartCard;