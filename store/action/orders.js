import Orders from "../../model/Orders"

export const ADD_ORDERS='ADDORDERS'
export const FETCH_ORDERS='FETCH_ORDERS'

export const addOrders=(customerName,customerId,chefId,dishes,orderWorth,location)=>{
    return async(dispatch)=>{
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/orders.json',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                customerName,
                customerId,
                chefId,
                dishes,
                orderWorth,
                location
            })
        })
        const resdata=await response.json()
        dispatch({type:ADD_ORDERS,data:{
            id:resdata.name,
            customerName,
            customerId,
            chefId,
            dishes,
            orderWorth,
            location
        }})
    }
}

export const fetchOrders=()=>{
    return async(dispatch)=>{
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/orders.json')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Orders(key,resData[key].customerName,resData[key].customerId,resData[key].chefId,resData[key].dishes,resData[key].orderWorth,resData[key].location))
        }
        dispatch({type:FETCH_ORDERS,data:list})
    }
}