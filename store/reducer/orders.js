import Orders from "../../model/Orders"
import { ADD_ORDERS, FETCH_ORDERS } from "../action/orders"

const initialState={
    orders:[]
}

export default OrderHandler=(state=initialState,action)=>{
    switch(action.type){
        case ADD_ORDERS:
            const order=new Orders(
                action.data.id,
                action.data.customerName,
                action.data.customerId,
                action.data.chefId,
                action.data.dishes,
                action.data.orderWorth,
                action.data.location,

            )
            return{
                ...state,
                orders:state.orders.concat(order)
            }
        case FETCH_ORDERS:
            return{
                ...state,
                orders:action.data
            }
        default:return state;
    }
}