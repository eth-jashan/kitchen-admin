export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'
export const UPDATE_ACC='UPDATE_ACC'

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}

export const createAccount=(name,email,phone,cuisine,type,address,useraddress)=>{
    return async(dispatch,getState)=>{
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Chef.json?',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                email,
                phone,
                cuisine,
                type,
                address,
                useraddress,
                created:true,
                Kyc:false
            })
        })
        const resData=await response.json()

        dispatch({type:SIGNUP_ACCOUNT,data:{
            id:resData.name,
            name,
            email,
            phone,
            cuisine,
            type,
            address,
            useraddress,
            created:true,
            kyc:false
        }})
    }
}

export const UpdateChef=(id,email,cuisine,type)=>{
    return async(dispatch,getState)=>{
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Chef/${id}.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                email,
                cuisine,
                type
            })
        })
        dispatch({type:UPDATE_ACC,cid:id,data:{
            email,
            cuisine,
            type
        }})
    }
}
