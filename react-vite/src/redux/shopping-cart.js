const CREATE_SINGLE_CART = 'cart/createSingleCART';


// action
const createSingleCartAction = (cart) => {
    return {
        type: CREATE_SINGLE_CART,
        payload: cart
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

// Reducer

const initialState = { Carts: {}}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SINGLE_CART: {
            return {...state, Carts: {...state.Carts, [action.payload.id]: action.payload}}
        }
        default:
            return state;
    }
}

export default cartReducer;