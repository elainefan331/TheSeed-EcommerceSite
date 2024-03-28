import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateReviewModal from "../CreateReviewModal";
import "./ProductDetailPage.css"


function ProductDetailPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { setModalContent } = useModal();
    const currentUser = useSelector(state => state.session.user)
    console.log("currentUser in component========>", currentUser)
    const productState = useSelector(state => state.product)
    const product = productState?.Products[productId]
    console.log("product in product detail component=======", product)
    const reviewArray = product?.reviews
    console.log("reviews in product detail component ========", reviewArray)

    useEffect(() => {
        dispatch(getSingleProductThunk(productId))
    }, [dispatch, productId])

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
        setModalContent(<DeleteReviewModal reviewId={reviewId} />)
    }

    const handlePostClick = (productId) => {
        setModalContent(<CreateReviewModal productId={productId}/>)
    }

    return (
        <div className="product-show-page-container">
            <div className="product-details-container">
                <img src={product?.image} alt={product?.name} />
                <div>
                    <p>{product?.name}</p>
                    <p>${product?.price}</p>
                    <div>
                        <h3>Description</h3>
                        <p>{product?.description}</p>
                    </div>
                    <button>Add To Cart</button>
                </div>
            </div>
            <div className="all-reviews-container">
                <div className="review-rating-count-container">
                    {product?.avg_rating > 0 ? <span><i style={{color: "orange"}} className="fa-solid fa-star">{product?.avg_rating}</i></span> : <h3>be the first one to give a review!</h3>}
                    <span>{product?.num_reviews > 1 ? `${product?.num_reviews} reviews`: product?.num_reviews == 0 ? null : `${product?.num_reviews} review`}</span>
                </div>

                <div className="post-your-review-container">
                    {ishidden()? null : (<button onClick={() => handlePostClick(productId)}>Post Your Review</button>)}

                </div>

                {product?.reviews.map((review) => {
                    return (  

                        <div key={review.id} className="single-review-container">
                            <h4>Review by {review?.user.first_name}</h4>
                            <p>{review?.review}</p>
                            {currentUser && currentUser?.id === review?.user_id && <button onClick={() => handleDeleteClick(review?.id)}>Delete</button>}
                            {currentUser && currentUser?.id === review?.user_id && <button>Update</button>}
                        </div>
                    )
                })}

            </div>
        </div>

    )
}

export default ProductDetailPage;