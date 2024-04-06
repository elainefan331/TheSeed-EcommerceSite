const CREATE_SINGLE_CART = 'cart/createSingleCART';
const GET_ALL_CARTS = 'cart/getAllCarts';


// action
const createSingleCartAction = (cart) => {
    return {
        type: CREATE_SINGLE_CART,
        payload: cart
    }
}

const getAllCartsAction = (carts) => {
    return {
        type: GET_ALL_CARTS,
        payload: carts
    }
}


// Thunk Creators

// checkout thunk
// return single cart detail after checkout
export const checkoutThunk = (cartItems) => async (dispatch) => {
    const response = await fetch('/api/carts', {
        method: 'POST',
        body: JSON.stringify({
            cart_items: cartItems
        })
    });

    if(response.ok) {
        const newCart = await response.json();
        console.log("newCart==================", newCart)
        dispatch(createSingleCartAction(newCart));
    }

}

// get all carts(orders) made by current user
export const getCurrentCartsThunk = () => async (dispatch) => {
    const response = await fetch('/api/carts/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json()
    dispatch(getAllCartsAction(data.carts))
}

// Reducer

const initialState = { Carts: {}}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SINGLE_CART: {
            return {...state, Carts: {...state.Carts, [action.payload.id]: action.payload}}
        }
        case GET_ALL_CARTS: {
            const newObj = {};
            action.payload.forEach(cart => newObj[cart.id] = {...cart});
            return {...state, Carts: {...newObj}}
        }
        default:
            return state;
    }
}

export default cartReducer;