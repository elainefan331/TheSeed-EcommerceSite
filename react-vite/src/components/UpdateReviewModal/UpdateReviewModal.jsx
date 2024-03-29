import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import StarsRatingInput from "../StarsRatingInput";
import { updateReviewThunk, getSingleReviewThunk } from "../../redux/reviews";

function UpdateReviewModal({reviewId, reviewUpdated}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const reviewState = useSelector(state => state.review)
    console.log("reviewState in component========", reviewState)
    const targetReview = reviewState[reviewId]
    console.log("review in component========", targetReview)

    const [review, setReview] = useState(targetReview?.review)
    const [rating, setRating] = useState(targetReview?.rating)


    useEffect(() => {
        dispatch(getSingleReviewThunk(reviewId))
    }, [dispatch, reviewId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("review", review);
        formData.append("rating", rating);
        await dispatch(updateReviewThunk(formData, reviewId));
        reviewUpdated();
        closeModal();
    }

    const onChange = (num) =>{
        setRating(num)
    }

    const isDisabled = review.length < 10 || rating === null;

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="create-review-modal-container"
        >
            <h1>Update your review</h1>
            <div className="create-review-textarea-container">
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <p>review at least 10 characters</p>
            </div>
            <div>
                <div className="create-review-stars-container">
                    <StarsRatingInput 
                        onChange={onChange}
                        rating={rating}
                    />
                    <span>Stars</span>
                </div>
            </div>
            <button 
                className={isDisabled? "create-review-submit-button-disable" : "create-review-submit-button-active"}
                type="submit"
                disabled= {isDisabled}
            >
                Submit Your Review
            </button>
        </form>
    )
}

export default UpdateReviewModal;