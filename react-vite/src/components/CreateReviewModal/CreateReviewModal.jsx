import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import StarsRatingInput from "../StarsRatingInput";

function CreateReviewModal({productId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)


    const onChange = (num) =>{
        setRating(num)
    }

    return (
        <form
            // onSubmit={handleSubmit}
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