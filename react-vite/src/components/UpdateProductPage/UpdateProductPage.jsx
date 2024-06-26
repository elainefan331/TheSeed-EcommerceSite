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
    const product = productState?.Products[productId]

    const [name, setName] = useState(product?.name)
    const [description, setDescription] = useState(product?.description)
    const [price, setPrice] = useState(product?.price)
    const [image, setImage] = useState(null)
    const [previewUrl] = useState(product?.image)
    const currentUser = useSelector(state => state.session.user)
    if(!currentUser) navigate("/")

    const regex = /^\d+(\.\d{0,2})?$/;//add

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


    const isDisabled = name.length < 1 || description.length < 20 || !price || price <=0 || !regex.test(price);//add

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
                            <div>{name.length < 1 && <p className="update-product-validator">name is required</p>}</div>
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
                            <div>{description.length < 20 && <p className="update-product-validator">Description needs 20 or more characters</p>}</div>
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
                            <div>{!price && <p className="update-product-validator">price is required</p>}</div>
                            <div>{price <= 0 && <p className="update-product-validator">price must be greater than 0</p>}</div>
                            <div>{!regex.test(price) && <p className="update-product-validator">We only accept numbers with up to two decimal positions</p>}</div>
                    </div>

                    <div className="update-product-input-container">
                        <div>
                            {previewUrl && <p>Product Image</p>}
                            {previewUrl && <img src={previewUrl} alt="Product Image" style={{ width: '200px', height: '200px', borderRadius: "10px" }} />}
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

                    <button 
                        className={isDisabled? "update-product-submit-button-disable" : "update-product-submit-button-active"} 
                        type="submit"
                        disabled= {isDisabled}
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default UpdateProductPage;