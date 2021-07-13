import Orders from "../../model/Orders"
import { ADD_ORDERS, FETCH_ORDERS, STATUS_CHANGE } from "../action/orders"

const initialState={
    orders:[],
    activeOrders:[],
    completedOrders:[]
}

export default OrderHandler=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_ORDERS:

        const orderList = action.data

            return{
                ...state,
                orders:orderList,
                activeOrders:orderList.filter(x=>x.status[x.status.length -1].status === ('Accepted')),
                completedOrders:orderList.filter(x=>x.status[x.status.length -1].status === ('Delivered'))
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

                return{
                    ...state,
                    orders:updatedNewOrder,
                    activeOrders:updatedNewOrder.filter(x=>(x.status === ('Pending')|| x.status === ('Accepted') || x.status === ('Not Accepted')))
                }
            
            
            
        }
        default:return state;
    }
}