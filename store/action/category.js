import Category from "../../model/Category";
import storage from '@react-native-firebase/storage';

export const ADD_CATEGORY='ADD_CATEGORY'
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const EDIT_CATEGORY='EDIT_CATEGORY'
export const EDIT_URL='EDIT_URL'
export const DELETE_CAT='DELETE_CAT'

export const addcategory=(name,description,imguri,lat,long)=>{
    return async(dispatch,getState)=>{
        const uid=getState().profile.uid;
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category.json',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                uid,
                description,
                lat,
                long
            })
        })
        const resData=await response.json()
        const images = await fetch(imguri);
        const blob = await images.blob();
        const ref = storage().ref(`${'category/'}${resData.name}`);
        await ref.put(blob);
        const url= await storage().ref(`${'category/'}${resData.name}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category/${resData.name}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                imguri:url
            })
        })
        dispatch({type:ADD_CATEGORY,data:{
            id:resData.name,
            name,
            uid,
            description,
            imguri:url,
            lat,
            long
        }})
    }
}

export const fetchCategory=()=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid
        //console.log(uid);
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category.json?')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Category(key,
                resData[key].uid,
                resData[key].name,
                resData[key].description,
                resData[key].imguri,
                resData[key].lat,
                resData[key].long))
        }
        //console.log(resData);
        dispatch({type:FETCH_CATEGORY,data:list,userid:'9C2WqGOrbBf6sep55mXEpN4LiNn1'})
    }
}

export const editCategory=(id,name,description,imguri,lat,long)=>{
    return async (dispatch,getState)=>{
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category/${id}.json?`)
        const resData=await response.json()
        if(resData[0].imguri==imguri){
            const response1=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category/${id}.json?`,{
                method:"PATCH",
                headers:{'Content-Type':'application\json'},
                body:JSON.stringify({
                    name,
                    description,
                    lat,
                    long
                })
            })
            dispatch({type:EDIT_CATEGORY,data:{
                id,
                name,
                description,
                lat,
                long
            }})
        }
        else{
            const ref = storage().ref(`${'category/'}${id}`);
            ref.delete()
            const images = await fetch(imguri);
            const blob = await images.blob();
            await ref.put(blob);
            const url= await storage().ref(`${'category/'}${id}`).getDownloadURL();
            const response2=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category/${id}.json?`,{
                method:"PATCH",
                headers:{'Content-Type':'application\json'},
                body:JSON.stringify({
                    name,
                    description,
                    imguri:url,
                    lat,
                    long
                })
            })
            dispatch({type:EDIT_URL,data:{
                id,
                name,
                description,
                imguri:url,
                lat,
                long
            }})
        }
    }

}

export const deleteCategory=(id)=>{
    return async dispatch=>{
        const response =await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category/${id}.json?`,{
            method:"DELETE"
        })
        dispatch({type:DELETE_CAT,cid:id})

    }
}