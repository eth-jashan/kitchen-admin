import Category from "../../model/Category";
import storage from '@react-native-firebase/storage';

export const ADD_CATEGORY='ADD_CATEGORY'
export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const addcategory=(name,description,imguri)=>{
    return async(dispatch,getState)=>{
        const uid=getState().profile.uid;
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/category.json`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                description,
                imguri:''
            })
        })
        const resData=await response.json()
        const images = await fetch(imguri);
        const blob = await images.blob();
        const ref = storage().ref(`${'category/'}${resData.name}`);
        await ref.put(blob);
        const url= await storage().ref(`${'category/'}${resData.name}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/category/${resData.name}.json`,{
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

export const fetchCategory=()=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid
        //console.log(uid);
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/category.json?`)
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Category(key,
                resData[key].name,
                resData[key].description,
                resData[key].imguri))
        }
        //console.log(resData);
        dispatch({type:FETCH_CATEGORY,data:list})
    }
}