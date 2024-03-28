const CREATE_REVIEW = 'review/createReview'


// action
const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}


// thunk creators

// create a new review based on product's id
export const createReviewThunk = (formData, productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: formData 
    });
    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReviewAction(newReview))
    }
}

// reducer



const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW: {
           return {...state, [action.payload.id]: action.payload}
        }
        default:
            return state;
    }
}

export default reviewReducer;