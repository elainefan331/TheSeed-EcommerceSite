import { useDispatch } from "react-redux";

function OrderHistoryPage() {
    const dispatch = useDispatch();

    return (
        <div className="order-history-page">
            <h1>Order History</h1>
            <div className="order-history-card">

            </div>


        </div>
    )
}

export default OrderHistoryPage;