import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../../../redux/product";
import ProductIndexItem from "../../ProductIndexItem";

function LargePage() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const products = Object.values(productState?.Products);

    const largeProducts = products?.filter(product => product.size === 'Large')

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return (
        <section className="category-page-container">
            <div>
                <h1>Large Collection</h1>
            </div>

            <div className="category-page-products-container">
                {largeProducts?.map((product) => {
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

export default LargePage;