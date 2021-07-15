import { CREATE_TOKEN, PATCH_ORDER } from "../action/dunzo_delivery"


const initialState = {
    token:null,
    eta:[],
    status:null,
    taskId:null,
    price:0
}

export default (state = initialState,action) => {
    switch(action.type){
        case CREATE_TOKEN:
            return{
                ...state,
                token:action.token
            }
        case PATCH_ORDER:
            return{
                ...state,
                // eta:action.orderData.eta,
                // status:action.orderData.status,
                taskId:action.orderData.taskId,
               // price:action.orderData.price
            }
        default:
            return state
    }
}