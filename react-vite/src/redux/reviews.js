// Action Type Constants
const CREATE_REVIEW = 'review/createReview';
const DELETE_REVIEW = 'review/deleteReview';
const UPDATE_REVIEW = 'review/updateReview';
const GET_SINGLE_REVIEW = 'review/getSingleReview';



// action
const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}

const updateReviewAction = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review
    }
}

const getSingleReviewAction = (review) => {
    return {
        type: GET_SINGLE_REVIEW,
        payload: review
    }
}


// thunk creators

// create a new review based on product's id thunk
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

// delete a review by review's id thunk
export const deleteReviewThunk = (reviewId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
    });
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

// update a review by review's id thunk
export const updateReviewThunk = (formData, reviewId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: formData
    });
    if (response.ok) {
        const updateReview = await response.json()
        dispatch(updateReviewAction(updateReview))
    }
}

// get single reivew by review's id thunk
export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const review = await response.json()
    dispatch(getSingleReviewAction(review))

}


// reducer

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW: {
           return {...state, [action.payload.id]: action.payload}
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.payload]
            return newState;
        }
        case UPDATE_REVIEW: {
            return {...state, [action.payload.id]: action.payload}
        }
        case GET_SINGLE_REVIEW: {
            return {...state, [action.payload.id]: action.payload}
        }
        default:
            return state;
    }
}

export default reviewReducer;