import axios from "axios"

export const addItemHandler = item => {
    return (dispatch, getState) => {
        const currentQuantity = getState().cart.items.find(i => i.id === item.id)?.quantity || 0;
        if (currentQuantity + 1 <= 5) {
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    item: item
                }
            });
        } else {
            console.warn("Item quantity exceeds the limit of 5.");
            // Optionally, you can dispatch another action here to handle the error or inform the user.
        }
    }
}


export const removeItemHandler = id => {
    return dispatch => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: {
                id: id
            }
        })
    }
}

export const clearCartHandler = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_CART"
        })
    }
}

export const placeOrderHandler = (callback) => {
    return async (dispatch, getState) => {
        try {
            const { auth, cart } = getState()
            if(!auth.idToken) {
                return callback({
                    error: true,
                    data: {
                        error: "Please login to place the order."
                    }
                })
            }
            const response = await axios.post(`https://e-commerce-react-629c3-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}`, {
                ...cart
            })
            dispatch({
                type: "CLEAR_CART"
            })
            return callback({
                error: false,
                data: response.data
            })
        } catch (error) {
            return callback({
                error: true,
                ...error.response
            })
        }
    }
}