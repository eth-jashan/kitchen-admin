export const ADD_CATEGORY='ADD_CATEGORY'

export const addcategory=(name,description,imguri)=>{
    return async(dispatch,getState)=>{
        const uid=getState().profile.uid;
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/category.json`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                description
            })
        })
        const resData=await response.json()
        const images = await fetch(imguri);
        const blob = await images.blob();
        const ref = firebase.storage().ref(`${'category/'}${resData.name}`);
        await ref.put(blob);
        const url= await firebase.storage().ref(`${resData.name}`).getDownloadURL();
        const response1=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/category/${resData.name}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                imguri:url
            })
        })
        dispatch({type:ADD_CATEGORY,data:{
            id:resData.name,
            name,
            description,
            imguri:url
        }})
    }
}