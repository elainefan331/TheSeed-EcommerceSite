import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProductThunk } from "../../redux/product";
import "./CreateProductPage.css"

function CreateProductPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const currentUser = useSelector(state => state.session.user);
    if(!currentUser) navigate('/');

    useEffect(() => {
        const validationObj = {};

        if(name.length < 1) {
            validationObj.name = "name is required"
        }

        if(description.length < 20) {
            validationObj.description = "Description needs 20 or more characters"
        }

        if(!price) {
            validationObj.price = "Price is required"
        }

        if(price <= 0) {
            validationObj.minprice = "Price must be greater than 0"
        }

        if(!image) {
            validationObj.image = "Image is required (accept pdf, png, jpg, jpeg, gif)"
        } else {
            const fileType = image.type
            // console.log("file type=====================>", fileType)
            const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'application/pdf']
            if (! validTypes.includes(fileType)) {
                validationObj.imagetype = "Invalid file type, only PDF, PNG, JPG, JPEG, GIF are allowed" 
            }
        }

        setErrors(validationObj)
    }, [name, description, price, image])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length ===0 ) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("price", price);
            await dispatch(createNewProductThunk(formData))
            setImageLoading(true);
            navigate("/products/current")
        }
    }

    const isDisabled = name.length < 1 || description.length < 20 || !price || !image || price <=0;

    return (
        <div>
            <div className="create-product-title">
                <h1>Create a new product</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="create-product-form-container">
                    <div className="create-product-input-container">
                        <label>
                            Name
                        </label>
                            <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <div>{errors.name && <p className="create-product-validator">{errors.name}</p>}</div>
                    </div>

                    <div className="create-product-input-container">
                        <label>
                            Description
                        </label>
                            <textarea
                            className="create-product-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                            <div>{errors.description && <p className="create-product-validator">{errors.description}</p>}</div>
                    </div>

                    <div className="create-product-input-container">
                        <label>
                            Price $
                        </label>
                            <input 
                            type="number" step='1'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                            <div>{errors.price && <p className="create-product-validator">{errors.price}</p>}</div>
                            <div>{errors.minprice && <p className="create-product-validator">{errors.minprice}</p>}</div>
                    </div>

                    <div className="create-product-input-container">
                        <label>
                            Image
                        </label>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            />
                            <div>{errors.image && <p className="create-product-validator">{errors.image}</p>}</div>
                            <div>{errors.imagetype && <p className="create-product-validator">{errors.imagetype}</p>}</div>
                    </div>

                    <button 
                        className={isDisabled? "crate-product-submit-button-disable" : "create-product-submit-button-active"}
                        type="submit"
                        disabled= {isDisabled}
                    >
                        Submit
                    </button>
                    {(imageLoading) && <p>Loading...</p>}
                </div>
            </form>
        </div>
    )

}

export default CreateProductPage;