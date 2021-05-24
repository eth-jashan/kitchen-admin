export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}
