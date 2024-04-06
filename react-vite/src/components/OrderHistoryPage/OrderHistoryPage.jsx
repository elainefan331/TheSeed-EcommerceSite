import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentCartsThunk } from "../../redux/shopping-cart";
import OrderHistoryCartCard from "../OrderHistoryCartCard";
import "./OrderHistoryPage.css"

function OrderHistoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector(state => state.cart);
    const carts = [...Object.values(cartState?.Carts)].reverse();
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        if(!currentUser) navigate('/');
        dispatch(getCurrentCartsThunk())
    }, [dispatch, currentUser, navigate])

    return (
        <div className="order-history-page">
            <h1>Order History</h1>
            <section>
                <div className="order-history-card">
                    {carts?.map((cart) => {
                        return (
                            <div key={cart.id}>
                                <OrderHistoryCartCard cart={cart}/>
                            </div>
                        )
                    })}
                </div>
            </section>



        </div>
    )
}

export default OrderHistoryPage;