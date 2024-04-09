import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../../../redux/product";
import ProductIndexItem from "../../ProductIndexItem";

function MediumPage() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const products = Object.values(productState?.Products);

    const mediumProducts = products?.filter(product => product.size === 'Medium')

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllProductsThunk())
    }, [dispatch])


    return (
        <section className="category-page-container">
            <div>
                <h1>Medium Collection</h1>
            </div>

            <div className="category-page-products-container">
                {mediumProducts?.map((product) => {
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

export default MediumPage;