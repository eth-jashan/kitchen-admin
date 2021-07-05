import Orders from "../../model/Orders"

export const FETCH_ORDERS = 'FETCH_ORDERS'
export const STATUS_CHANGE = 'STATUS_CHANGE';

export const fetchOrders=()=>{
    return async(dispatch,getState)=>{

        //const chefId = getState().profile.uid
       // console.log(chefId)

        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/order.json')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Orders(key,resData[key].name,resData[key].uid,resData[key].chefId,resData[key].cartItems,resData[key].orderTotal,resData[key].address,resData[key].status,resData[key].date))
        }
            dispatch({type:FETCH_ORDERS,data:list.filter(x=>x.chefId === '7fn826hjo3h29bW6a0QGASqw4Yl1')})
     
        
    }
}

export const changeStatus = (id,status,time,len) => {
    return async(dispatch) => {
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}/status/${len}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                status,time
            })
        })
        dispatch({type:STATUS_CHANGE,updatedOrder:{status,id}})
    }
}
