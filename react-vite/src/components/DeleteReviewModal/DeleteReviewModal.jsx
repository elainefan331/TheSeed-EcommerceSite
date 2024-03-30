import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../redux/reviews";
import "./DeleteReviewModal.css"

function DeleteReviewModal({reviewId, reviewDeleted}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId));
        reviewDeleted();
        closeModal();
    }

    return (
        <div className="delete-review-modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button className="delete-review-yes-button" onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="delete-review-no-button" onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;