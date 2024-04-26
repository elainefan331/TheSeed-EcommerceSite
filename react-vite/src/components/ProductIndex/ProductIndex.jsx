import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllProductsThunk } from "../../redux/product";
import { NavLink, useNavigate } from "react-router-dom";
import ProductIndexItem from "../ProductIndexItem";
import "./ProductIndex.css"
import "./SlidesShow.css"

function ProductIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productState = useSelector(state => state.product);

    const products = Object.values(productState?.Products);

    const newArrivalsRef = useRef(null);

    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    const outdoorButtonClick = (e) => {
        e.preventDefault();
        navigate("/blooms")
    }

    const smallClick = (e) => {
        e.preventDefault();
        navigate("/small")
    }

    const mediumClick = (e) => {
        e.preventDefault();
        navigate("/medium")
    }

    const largeClick = (e) => {
        e.preventDefault();
        navigate("/large")
    }

    const bloomsClick = (e) => {
        e.preventDefault();
        navigate("/blooms")
    }

    const giftsClick = (e) => {
        e.preventDefault();
        navigate("/gifts")
    }

    // slide show
    const [slideIndex, setSlideIndex] = useState(0);
    // Image data array
    const slides = [
        {src: "https://live.staticflickr.com/65535/53649391131_eb206bf03b_c.jpg"},
        {src: "https://live.staticflickr.com/65535/53620964150_87cb53c8e8_c.jpg"},
        {src: "https://live.staticflickr.com/65535/53659137083_7ba01c4f52_c.jpg"},
        {src: "https://live.staticflickr.com/65535/53658908666_5c0837aed2_c.jpg"}
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
          setSlideIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000); // Change image every 2 seconds
        return () => clearTimeout(timer);
      }, [slideIndex, slides.length]);
    
    return (
        <div className="landing-page-whole-container">
            <div className="landing-page-img-text-cantainer">
                <div className="slideshow-container">
                    {slides.map((slide, index) => (
                        <div key={index} className={`mySlides fade ${index === slideIndex ? 'show' : ''}`}>
                            <img src={slide.src} alt={`Slide ${index + 1}`} style={{width: "100%"}} className="landing-page-slide-image"/>
                            <div className="landing-page-text-container">
                                <h1>Outdoor plants have arrived!</h1>
                                <div className="landing-page-button-container">
                                    <button 
                                        onClick={outdoorButtonClick}
                                        className="landing-page-outdoor-collection-button"
                                    >
                                        Shop Blooms
                                    </button>
                                    <button 
                                        className="landing-page-new-arrivals-button"
                                        onClick={() => newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        New Arrivals
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            <br />
            <div style={{textAlign: 'center'}}>
                {slides.map((_, idx) => (
                    <span key={idx} className={`dot ${idx === slideIndex ? 'active-dot' : ''}`}></span>
                ))}
            </div>
                {/* <img src="https://live.staticflickr.com/65535/53620964150_87cb53c8e8_c.jpg" alt="outdoor plant" className="landing-page-img"/>
                <div className="landing-page-text-container">
                    <h1>Outdoor plants have arrived!</h1>
                    <div className="landing-page-button-container">
                        <button 
                            onClick={outdoorButtonClick}
                            className="landing-page-outdoor-collection-button"
                        >
                            Shop Blooms
                        </button>
                        <button 
                            className="landing-page-new-arrivals-button"
                            onClick={() => newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' })}
                        >
                            New Arrivals
                        </button>
                    </div>
                </div> */}
            </div>
                
            <section className="category-section">
                <div className="new-arrival-h1-container">
                    <h1 className="landing-page-h1">Most Popular Categories</h1>
                </div>

                <div className="category-container">
                    <div className="category-card-container" onClick={smallClick}>
                        <img src="https://live.staticflickr.com/65535/53633183882_574eb7cb50_c.jpg" className="category-img" />
                        <h3>Small</h3>
                    </div>

                    <div className="category-card-container" onClick={mediumClick}>
                        <img src="https://live.staticflickr.com/65535/53634076451_f92b4917f5_c.jpg" className="category-img" />
                        <h3>Medium</h3>
                    </div>

                    <div className="category-card-container" onClick={largeClick}>
                        <img src="https://live.staticflickr.com/65535/53634077481_f1c5e0d8b7_c.jpg" className="category-img" />
                        <h3>Large</h3>
                    </div>

                    <div className="category-card-container" onClick={bloomsClick}>
                        <img src="https://live.staticflickr.com/65535/53635707631_74170b03ee_c.jpg" className="category-img" />
                        <h3>Blooms</h3>
                    </div>

                    <div className="category-card-container" onClick={giftsClick}>
                        <img src="https://live.staticflickr.com/65535/53634295633_085dd2cfec_c.jpg" className="category-img" />
                        <h3>Gifts</h3>
                    </div>

                    <div className="category-card-container no-display-pic" onClick={() => newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' })}>
                        <img src="https://live.staticflickr.com/65535/53658891001_1f9a37b253_c.jpg" className="category-img" />
                        <h3>New Arrivals</h3>
                    </div>

                </div>

            </section>

            <section ref={newArrivalsRef} className="new-arrival-section">
                <div className="new-arrival-h1-container">
                    <h1 className="landing-page-h1">New Arrivals</h1>
                </div>

                
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