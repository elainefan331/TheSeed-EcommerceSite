import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import StarsRatingInput from "../StarsRatingInput";
import { createReviewThunk } from "../../redux/reviews";

function CreateReviewModal({productId, reviewPosted}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("review", review);
        formData.append("rating", rating);
        await dispatch(createReviewThunk(formData, productId));
        reviewPosted();
        closeModal();
    }

    const onChange = (num) =>{
        setRating(num)
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <h1>How was your purchase?</h1>
            <textarea
                placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <div>
                <div>
                    <StarsRatingInput 
                        onChange={onChange}
                        rating={rating}
                    />
                    <span>Stars</span>
                </div>
            </div>
            <button type="submit">Submit Your Review</button>
        </form>
    )
}

export default CreateReviewModal;