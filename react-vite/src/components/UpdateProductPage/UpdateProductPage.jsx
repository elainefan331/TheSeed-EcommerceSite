import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getSingleProductThunk, updateProductThunk } from "../../redux/product";
import "./UpdateProductPage.css"


function UpdateProductPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();

    const productState = useSelector(state => state.product)
    console.log("productState in component=========", productState)
    const product = productState?.Products[productId]
    console.log("product in component============", product)

    const [name, setName] = useState(product?.name)
    const [description, setDescription] = useState(product?.description)
    const [price, setPrice] = useState(product?.price)
    const [image, setImage] = useState(null)
    const [previewUrl] = useState(product?.image)
    const currentUser = useSelector(state => state.session.user)
    if(!currentUser) navigate("/")

    useEffect(() => {
        dispatch(getSingleProductThunk(productId))
    }, [dispatch, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        await dispatch(updateProductThunk(formData, productId))
        navigate(`/products/${productId}`)
    }




    return (
        <div>
            <div className="update-product-title">
                <h1>Update your product</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="update-product-form-container">
                    <div className="update-product-input-container">
                        <label>
                            Name
                        </label> 
                            <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div> 

                    <div className="update-product-input-container">
                        <label>
                            Description
                        </label>
                            <textarea
                            className="update-product-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                    </div>

                    <div className="update-product-input-container">
                        <label>
                            Price $
                        </label>
                            <input 
                            type="number" step='1'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                    </div>

                    <div className="update-product-input-container">
                        <div>
                            {previewUrl && <p>Product Image</p>}
                            {previewUrl && <img src={previewUrl} alt="Product Image" style={{ width: '200px', height: '200px' }} />}
                        </div>
                        <label>
                            Change Product Image
                        </label>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            />
                    </div>

                    <button className="update-product-submit-button" type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default UpdateProductPage;