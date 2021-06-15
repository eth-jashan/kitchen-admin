import Dish from "../../model/Dish"
import storage from '@react-native-firebase/storage';
export const ADD_CUISINE = 'ADD_CUISINE'
export const ADD_DISH='ADD_DISH'
export const FETCHDISH='FETCHDISH'

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
        const response= await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/Dish.json?`,{
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
                categoryname:false,
                imguri:''
            })
        })
        const resData=await response.json()
        const images = await fetch(img);
        const blob = await images.blob();
        const ref = storage().ref(`${'dish/'}${resData.name}`);
        await ref.put(blob);
        const url= await storage().ref(`${'dish/'}${resData.name}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/Dish/${resData.name}.json?`,{
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

export const fetchDish=()=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid

        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/${uid}/Dish.json?`)
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Dish(key,
                resData[key].name,
                resData[key].description,
                resData[key].imguri,
                resData[key].spicy,
                resData[key].cuisine,
                resData[key].price,
                resData[key].noServe,
                resData[key].quantity,
                resData[key].categoryid,
                resData[key].categoryname))
        }
        //console.log(resData);
        dispatch({type:FETCHDISH,data:list})
    }
}
