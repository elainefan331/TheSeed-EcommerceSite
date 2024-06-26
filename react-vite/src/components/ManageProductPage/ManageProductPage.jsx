import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { getCurrentProductsThunk } from "../../redux/product";
import { useModal} from "../../context/Modal";
import ProductIndexItem from "../ProductIndexItem";
import DeleteProductModal from "../DeleteProductModal";
import "./ManageProductPage.css"


function ManageProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const productState = useSelector(state => state.product);
    const products = Object.values(productState?.Products)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (!currentUser) navigate('/');
        dispatch(getCurrentProductsThunk())
    }, [dispatch, currentUser, navigate])


    const handleDeleteClick = (productId) => {
        setModalContent(<DeleteProductModal productId={productId}/>)
    }


    return (
        <div className="manage-your-product-whole-container">
            <h1 className="manage-your-product-h1">Manage Your Products</h1>
            <button className="create-product-button"><Link to={`/products/new`} className="create-product-link">create a new product</Link></button>
            <section>
                <div className="products-container">
                    {products?.map((product) => {
                        return (
                            <div key={product.id}>
                                <NavLink to={`/products/${product.id}`} className="product-item-card-navlink">
                                    <ProductIndexItem product={product} />
                                </NavLink>
                                <div className="update-delete-product-buttons-container">
                                <button className="update-product-button"><Link className="update-product-link" to={`/products/${product.id}/edit`}>Update</Link></button>
                                <button className="delete-product-button" onClick={() => handleDeleteClick(product.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </section>
        </div>
    )
}

export default ManageProductPage;