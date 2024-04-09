const GET_ALL_PRODUCTS = 'product/getAllProducts';
const GET_SINGLE_PRODUCT = 'product/getSingleProduct';
const UPDATE_PRODUCT = 'product/updateProduct';
const DELETE_PRODUCT = 'product/deleteProduct';



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

const updateProductAction = (product) => {
    return {
        type: UPDATE_PRODUCT,
        payload: product
    }
}

const deleteProductAction = (productId) => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
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

// update a product thunk
export const updateProductThunk = (formData, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: formData
    });
    if(response.ok) {
        const updateProduct = await response.json()
        dispatch(updateProductAction(updateProduct))
    }
}

// delete a product by product's id
export const deleteProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
        dispatch(deleteProductAction(productId))
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
        case UPDATE_PRODUCT: {
            return {...state, Products: {...state.Products, [action.payload.id]: action.payload}}
        }
        case DELETE_PRODUCT: {
            const newState = { ...state };
            delete newState.Products[action.payload];
            return newState
        }
        default:
            return state;
    }
}

export default productReducer;