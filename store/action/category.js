export const ADD_CATEGORY='ADD_CATEGORY'

export const addcategory=(name,description,imguri)=>{
    return async(dispatch,getState)=>{
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Category.json',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                description,
                imguri
            })
        })
        const resData=await response.json()
        dispatch({type:ADD_CATEGORY,data:{
            id:resData.name,
            name,
            description,
            imguri
        }})
    }
}