import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../../../redux/product";
import ProductIndexItem from "../../ProductIndexItem";

function BloomPage() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const products = Object.values(productState?.Products);
    console.log("products in component================>", products)

    const bloomProducts = products?.filter(product => product.size === 'bloom')

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return (
        <section className="category-page-container">
            <div>
                <h1>Blooms</h1>
            </div>

            <div className="category-page-products-container">
                {bloomProducts?.map((product) => {
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

export default BloomPage;