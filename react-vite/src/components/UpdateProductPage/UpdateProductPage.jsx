import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProductThunk, updateProductThunk } from "../../redux/product";


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
            <h1>Update your product</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
               <label>
                    Name
                    <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label> 

                <label>
                    Description
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    Price $
                    <input 
                    type="number" step='1'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </label>

                <label>
                    Change Product Image
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                {previewUrl && <img src={previewUrl} alt="Product Image" style={{ width: '100px', height: '100px' }} />}
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default UpdateProductPage;