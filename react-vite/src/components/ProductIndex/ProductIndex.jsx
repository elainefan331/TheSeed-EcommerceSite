import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductsThunk } from "../../redux/product";
import { NavLink } from "react-router-dom";
import ProductIndexItem from "../ProductIndexItem";
import "./ProductIndex.css"

function ProductIndex() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    console.log("productState in component=========>", productState)

    const products = Object.values(productState?.Products);
    console.log("products in component================>", products)

    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])
    
    return (
        <section>
            <div className="products-container">
                {products?.map((product) => {
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

export default ProductIndex;