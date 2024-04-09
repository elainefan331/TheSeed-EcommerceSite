import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../../../redux/product";
import ProductIndexItem from "../../ProductIndexItem";

function GiftPage() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const products = Object.values(productState?.Products);

    const giftProducts = products?.filter(product => product.size === 'gift')

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return (
        <section className="category-page-container">
            <div>
                <h1>Gifts</h1>
            </div>

            <div className="category-page-products-container">
                {giftProducts?.map((product) => {
                    return (
                        <NavLink key={product.id} to={`/products/${product.id}`} className="product-item-card-navlink">
                            <ProductIndexItem product={product} />
                        </NavLink>
                    )
                })}
            </div>
        </section>
    )
}

export default GiftPage;