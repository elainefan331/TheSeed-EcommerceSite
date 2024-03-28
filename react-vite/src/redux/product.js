const GET_ALL_PRODUCTS = 'product/getAllProducts';
const GET_SINGLE_PRODUCT = 'product/getSingleProduct'



// action
const getAllProductsAction = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: products
    }
}

const getSingleProductAction = (product) => {
    return {
        type: GET_SINGLE_PRODUCT,
        payload: product
    }
}




// Thunk Creators

// get all products
export const getAllProductsThunk = () => async (dispatch) => {
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  
    });
    const data = await response.json();
    console.log("products in thunk ==========>", data)
    dispatch(getAllProductsAction(data.products))
}

// get product detail by product's id
export const getSingleProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const product = await response.json()
    console.log("product in thunk ===============>", product)
    dispatch(getSingleProductAction(product))
}

// get all the products belongs to current user
export const getCurrentProductsThunk = () => async (dispatch) => {
    const response = await fetch('/api/products/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json()
    dispatch(getAllProductsAction(data.products))
}

// create a new product thunk
export const createNewProductThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
    });
    if(response.ok) {
        const newProduct = await response.json()
        dispatch(getSingleProductAction(newProduct))
    }
}




// Reducer
const initialState = { Products: {}}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            const newObj = {};
            action.payload.forEach(product => newObj[product.id] = { ...product });
            return { ...state, Products: { ...newObj } }
        }
        case GET_SINGLE_PRODUCT: {
            return {...state, Products: {...state.Products, [action.payload.id]: action.payload}}
        }
        default:
            return state;
    }
}

export default productReducer;