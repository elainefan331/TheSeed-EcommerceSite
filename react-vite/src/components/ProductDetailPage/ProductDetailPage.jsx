import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";//add
import LoginFormModal from "../LoginFormModal";//add
import SignupFormModal from "../SignupFormModal"//add
import "./ProductDetailPage.css"


function ProductDetailPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { setModalContent } = useModal();
    const [reviewPosted, setReviewPosted] = useState(false);
    const [reviewDeleted, setReviewDeleted] = useState(false);
    const [reviewUpdated, setReviewUpdated] = useState(false);

    const { cartItems, setCartItems } = useShoppingCart();


    const currentUser = useSelector(state => state.session.user)
    // console.log("currentUser in component========>", currentUser)
    const productState = useSelector(state => state.product)
    const product = productState?.Products[productId]
    // console.log("product in product detail component=======", product)
    const reviewArray = product?.reviews
    // console.log("reviews in product detail component ========", reviewArray)

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getSingleProductThunk(productId))
    }, [dispatch, productId, reviewPosted, reviewDeleted, reviewUpdated])

    const ishidden = () => {
        if(!currentUser) return true;
        if(currentUser && reviewArray) {
            for (let review of reviewArray) {
                if (review.user_id === currentUser.id) return true
            }
            return false;
        }
    }

    const handleDeleteClick = (reviewId) => {
        setModalContent(<DeleteReviewModal reviewId={reviewId} reviewDeleted={() => setReviewDeleted(prev => !prev)}/>)
    }

    const handlePostClick = (productId) => {
        setModalContent(<CreateReviewModal productId={productId} reviewPosted={() => setReviewPosted(prev => !prev)}/>)
    }

    const handleUpdateClick = (reviewId, reviewText, originRating) => {
        setModalContent(<UpdateReviewModal reviewId={reviewId} reviewText={reviewText} originRating={originRating} reviewUpdated={() => setReviewUpdated(prev => !prev)}/>)
    }

    const addToCartButtonClick = (e, productId, productName, productPrice, productImage) => {
        e.preventDefault();
        const existingItem = cartItems.find(item => item.productId === productId);
        if(existingItem) {
            const updatedCartItems = cartItems.map(item => (
                item.productId === productId? {...item, quantity: item.quantity + 1 } : item
            ));
            setCartItems(updatedCartItems);
        } else {
            const newItem = {
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                productImage: productImage,
                quantity: 1
            };
            setCartItems([...cartItems, newItem])
        }
    }

    const decreaseButtonClick = (e, productId) => {
        e.preventDefault();
        const existingItem = cartItems.find(item => item.productId === productId);
        
        if(existingItem) {
            if(existingItem.quantity === 1) {
                const updatedCartItems = cartItems.filter(item => item.productId !== productId);
                setCartItems(updatedCartItems);
            } else {
                const updatedCartItems = cartItems.map(item => (
                    item.productId === productId && item.quantity > 1? {...item, quantity: item.quantity - 1 } : item
                ));
                setCartItems(updatedCartItems);
            }
        } 
    }

    const itemExistInCart = () => {
        console.log("productId=======", productId)
        console.log("cartItems======", cartItems)
        const numericProductId = Number(productId);// cover sting from param() to number
        const existingItem = cartItems?.find(item => item.productId === numericProductId);
        console.log("existingItem======", existingItem)
        return existingItem ? existingItem.quantity : 0;
    }


    return (
        <div className="product-show-page-container">
            <div className="product-details-container">
                <img src={product?.image} alt={product?.name} />
                <div className="product-detail-info-container">
                    <p id="product-detail-name">{product?.name}</p>
                    <p id="product-detail-price">${product?.price}</p>
                    <div className="product-detail-description-container">
                        <h3>Description</h3>
                        <p>{product?.description}</p>
                    </div>
                    {!currentUser?  (
                    <div className="login-signup-on-detail-page">
                        <span><i className="fa-solid fa-leaf"></i></span>
                        <span> Please Log in / Sign up to bring the spring home!</span>
                        <OpenModalMenuItem itemText="Log In " modalComponent={<LoginFormModal />} />
                        <OpenModalMenuItem itemText="Sign Up " modalComponent={<SignupFormModal />} />
                    </div>
                    ):itemExistInCart() === 0 ? (<button 
                        onClick={(e) => addToCartButtonClick(e, product?.id, product?.name, product?.price, product?.image)}
                        className="product-detail-add-to-cart-button">Add To Cart</button>):(
                        <div className="product-detail-button-quantity-container">
                            <button
                                onClick={(e) => addToCartButtonClick(e, product?.id, product?.name, product?.price, product?.image)}
                                className="product-detail-change-quantity-button"
                            >+</button>
                            <span>{itemExistInCart()}</span>
                            <button
                                onClick={(e) => decreaseButtonClick(e, product?.id)}
                                className="product-detail-change-quantity-button"
                            >-</button>
                        </div>)}
                    
                    
                </div>
            </div>
            <div className="all-reviews-container">
                <div className="review-rating-count-container">
                    {product?.avg_rating > 0 ? <span><i style={{color: "rgb(62, 188, 142)"}} className="fa-solid fa-star">{product?.avg_rating}</i></span> : <h3>be the first one to give a review!</h3>}
                    <span>{product?.num_reviews > 1 ? `${product?.num_reviews} reviews`: product?.num_reviews == 0 ? null : `${product?.num_reviews} review`}</span>
                </div>

                <div className="post-your-review-container">
                    {ishidden()? null : (<button className="post-your-review-button" onClick={() => handlePostClick(productId)}>Post Your Review</button>)}

                </div>

                {product?.reviews.map((review) => {
                    return (  

                        <div key={review.id} className="single-review-container">
                            <h4>Review by {review?.user.first_name}</h4>
                            <p>{review?.review}</p>
                            {currentUser && currentUser?.id === review?.user_id && <button className="delete-review-button" onClick={() => handleDeleteClick(review?.id)}>Delete</button>}
                            {currentUser && currentUser?.id === review?.user_id && <button className="update-review-button" onClick={() => handleUpdateClick(review?.id, review?.review, review?.rating)}>Update</button>}
                        </div>
                    )
                })}

            </div>
        </div>

    )
}

export default ProductDetailPage;