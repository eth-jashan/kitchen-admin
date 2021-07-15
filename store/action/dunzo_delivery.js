export const CREATE_TOKEN = 'CREATE_TOKEN'
import { BASE_URL } from "../../constants/api_url"
export const PATCH_ORDER = 'PATCH_ORDER';

export const createToken = () => {

    return async (dispatch, getState) => {
        try {
            const response = await fetch('https://apis-staging.dunzo.in/api/v1/token',{
                method:'GET',
                headers:{
                    "client-id":BASE_URL.client_id,
                    "client-secret":BASE_URL.client_secret,
                    "Content-Type":"application/json"
                }
            })
    
            const resData = await response.json()
            console.log("token:====>", resData.token)
            dispatch({type:CREATE_TOKEN, token:resData.token})

        } catch (error) {
            console.log("Error", error)
        }
    }

}

export const patchOrder = (id,status,price,eta,taskId) => {
    return async(dispatch,getState) => {
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                price,
                eta,
                taskId
            })
        })
        dispatch({type:PATCH_ORDER,orderData:{price,taskId,eta,status}})
    }
}