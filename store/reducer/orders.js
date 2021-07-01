import Orders from "../../model/Orders"
import { ADD_ORDERS, FETCH_ACTIVE_ORDERS, FETCH_ORDERS, STATUS_CHANGE } from "../action/orders"

const initialState={
    orders:[],
    activeOrders:[],
    rejectedOrders:[]
}

export default OrderHandler=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_ORDERS:
            return{
                ...state,
                orders:action.data
            }
        case FETCH_ACTIVE_ORDERS:
            return{
                ...state,
                activeOrders:action.data
            }
        case STATUS_CHANGE:{
            const orderIndex = state.orders.findIndex(order => order.id === action.updatedOrder.id);

            const UpdatedOrders = new Orders(
                state.orders[orderIndex].id,
                state.orders[orderIndex].customerName,
                state.orders[orderIndex].customerId,
                state.orders[orderIndex].chefId,
                state.orders[orderIndex].dishes,
                state.orders[orderIndex].orderWorth,
                state.orders[orderIndex].location,
                action.updatedOrder.status, 
                state.orders[orderIndex].date 

            ) 
            const updatedNewOrder = [...state.orders];
            updatedNewOrder[orderIndex] = UpdatedOrders

            if(action.updatedOrder.status === 'Accept'){
                return{
                    ...state,
                    orders:updatedNewOrder,
                    activeOrders:updatedNewOrder
                }
            
            }else{
                return{
                    ...state,
                    rejectedOrders:updatedNewOrder
                }
            }
            
        }
        default:return state;
    }
}