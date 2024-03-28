import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../redux/product";
import "./DeleteProductModal.css"

function DeleteProductModal({productId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProductThunk(productId));
        closeModal();
    }

    return (
       <div className="delete-product-modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this product?</p>
            <button className="delete-product-yes-button" onClick={handleDelete}>Yes (Delete Product)</button>
            <button className="delete-product-no-button" onClick={closeModal}>No (Keep Product)</button>
       </div> 
    )
}

export default DeleteProductModal;