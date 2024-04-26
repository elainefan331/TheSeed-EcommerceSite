import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import StarsRatingInput from "../StarsRatingInput";
import { updateReviewThunk } from "../../redux/reviews";
import "./UpdateReviewModal.css"


function UpdateReviewModal({reviewId, reviewText, originRating, reviewUpdated}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(reviewText)
    const [rating, setRating] = useState(originRating)

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

    const isDisabled = review?.length < 10 || rating === null;

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
                <div>{review?.length < 10 && <p className="update-review-validator">review needs 10 or more characters</p>}</div>
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