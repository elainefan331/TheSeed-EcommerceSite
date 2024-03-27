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
export const getAllProductsThunk = () => async (dispatch) => {
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  
    });
    const data = await response.json();
    console.log("products in thunk ==========>", data)
    dispatch(getAllProductsAction(data.products))
}

export const getSingleProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const product = await response.json()
    console.log("product in thunk ===============>", product)
    dispatch(getSingleProductAction(product))
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