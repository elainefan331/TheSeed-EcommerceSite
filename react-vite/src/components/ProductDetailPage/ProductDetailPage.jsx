import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import "./ProductDetailPage.css"


function ProductDetailPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { setModalContent } = useModal();
    const [reviewPosted, setReviewPosted] = useState(false);
    const [reviewDeleted, setReviewDeleted] = useState(false);
    const [reviewUpdated, setReviewUpdated] = useState(false);


    const currentUser = useSelector(state => state.session.user)
    console.log("currentUser in component========>", currentUser)
    const productState = useSelector(state => state.product)
    const product = productState?.Products[productId]
    console.log("product in product detail component=======", product)
    const reviewArray = product?.reviews
    console.log("reviews in product detail component ========", reviewArray)

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

    const addToCartButtonClick = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon');
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
                    <button 
                    onClick={addToCartButtonClick}
                    className="product-detail-add-to-cart-button">Add To Cart</button>
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