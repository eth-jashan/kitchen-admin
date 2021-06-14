export const ADD_CUISINE = 'ADD_CUISINE'
export const ADD_DISH='ADD_DISH'
export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}

export const addDish=(name,description,img,spicy,price,noServe,quantity)=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid
        const response=fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/Dish.json?`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                description,
                spicy,
                cuisine,
                price,
                noServe,
                quantity,
                categoryid:false,
                categoryname:false
            })
        })
        const resData=await response.json()
        const images = await fetch(imguri);
        const blob = await images.blob();
        const ref = firebase.storage().ref(`${'dish/'}${resData.name}`);
        await ref.put(blob);
        const url= await firebase.storage().ref(`${resData.name}`).getDownloadURL();
        const response1=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/Dish.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                imguri:url
            })
        })
        dispatch({type:ADD_DISH,data:{
            id:resData.name,
            name,
            description,
            imguri:url,
            spicy,
            cuisine,
            price,
            noServe,
            quantity,
            categoryid:false,
            categoryname:false
        }})
    }
}