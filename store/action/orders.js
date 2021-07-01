import Orders from "../../model/Orders"

export const FETCH_ORDERS = 'FETCH_ORDERS'
export const FETCH_ACTIVE_ORDERS = 'FETCH_ACTIVE_ORDERS'
export const STATUS_CHANGE = 'STATUS_CHANGE';

export const fetchOrders=(result)=>{
    return async(dispatch,getState)=>{

        //const chefId = getState().profile.uid
       // console.log(chefId)

        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/order.json')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Orders(key,resData[key].name,resData[key].uid,resData[key].chefId,resData[key].cartItems,resData[key].orderTotal,resData[key].address,resData[key].status,resData[key].date))
        }
        if(result === 'all'){
            dispatch({type:FETCH_ORDERS,data:list.filter(x=>x.chefId === '7fn826hjo3h29bW6a0QGASqw4Yl1')})
        }
        else if(result === 'active'){
            dispatch({type:FETCH_ACTIVE_ORDERS,data:list.filter(x=>(x.chefId === '7fn826hjo3h29bW6a0QGASqw4Yl1')&&(x.status === 'Accepted'))})  
        }
        
    }
}

export const changeStatus = (id,status) => {
    return async(dispatch) => {
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                status:status
            })
        })
        dispatch({type:STATUS_CHANGE,updatedOrder:{status,id}})
    }
}
