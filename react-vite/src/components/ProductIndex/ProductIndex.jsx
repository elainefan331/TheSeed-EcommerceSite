import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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

    const newArrivalsRef = useRef(null);

    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    const outdoorButtonClick = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon');
    }
    
    return (
        <div className="landing-page-whole-container">
            <div className="landing-page-img-text-cantainer">
                <img src="https://live.staticflickr.com/65535/53620964150_87cb53c8e8_c.jpg" alt="outdoor plant" className="landing-page-img"/>
                <div className="landing-page-text-container">
                    <h1>Outdoor plants have arrived!</h1>
                    <div className="landing-page-button-container">
                        <button 
                            onClick={outdoorButtonClick}
                            className="landing-page-outdoor-collection-button"
                        >
                            Outdoor Collection
                        </button>
                        <button 
                            className="landing-page-new-arrivals-button"
                            onClick={() => newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Shop New Arrivals
                        </button>
                    </div>
                </div>
            </div>
            <section ref={newArrivalsRef}>
                <h1 className="landing-page-h1">New Arrivals</h1>
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
        </div>
    )
}

export default ProductIndex;