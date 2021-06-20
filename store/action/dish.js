import Dish from "../../model/Dish"
import storage from '@react-native-firebase/storage';
export const ADD_CUISINE = 'ADD_CUISINE'
export const ADD_DISH='ADD_DISH'
export const FETCHDISH='FETCHDISH'
export const EDIT_DISH = 'EDIT_DISH'
export const EDIT_DISH_WITHOUT_IMG = 'EDIT_DISH_WITHOUT_IMG'
export const DELETE_DISH = 'DELETE_DISH'

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}

export const addDish=(name,description,img,spicy,price,noServe,quantity,lat,long,type)=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid
        const response= await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish.json?`,{
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
                imguri:'',
                uid,
                lat,
                long,
                type
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
            categoryname:false, 
            uid,
            lat,
            long,
            type
        }})
    }
}

export const fetchDish=()=>{
    return async (dispatch,getState)=>{
        const cuisine=getState().dish.cuisine
        const uid=getState().profile.uid

        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish.json?`)
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
                resData[key].categoryname,
                resData[key].uid,
                resData[key].lat,
                resData[key].long,
                resData[key].type))
        }
        //console.log(resData);
        dispatch({type:FETCHDISH,data:list.filter(dish => dish.uid === uid)})
    }
}


export const imageCheck = (id,name,description,imguri,spicy,price,noServe,quantity,type) => {
    return async(dispatch,getState) => {
        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish/${id}.json`)
        const resData=await response.json()
        if(resData[0].imguri === imguri){
            const token = getState().profile.token
            const uid=getState().profile.uid
    
            const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish/${id}.json`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:name,
                    description:description,
                    spicy:spicy,
                    price:price,
                    noServe:noServe,
                    quantity:quantity,
                    type:type
                })
            })
            dispatch({type:EDIT_DISH_WITHOUT_IMG,updatedDish:{id,name,description,spicy,price,noServe,quantity,type}})
        }
        else{
            const ref = storage().ref(`${'dish/'}${id}`);
            ref.delete()
            const images = await fetch(imguri);
            const blob = await images.blob();
            await ref.put(blob);
            const url= await storage().ref(`${'dish/'}${id}`).getDownloadURL();
    
            const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish/${id}.json`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:name,
                    description:description,
                    spicy:spicy,
                    price:price,
                    imguri:url,
                    noServe:noServe,
                    quantity:quantity,
                    type:type
                })
            })
            dispatch({type:EDIT_DISH,updatedDish:{id,name,description,imguri:url,spicy,price,noServe,quantity,type}})
        }
    }
}

export const deleteDish = (id) => {
    return async(dispatch,getState) => {
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish/${id}.json`,{
            method:'DELETE'
        });
        dispatch({type:DELETE_DISH,dishId:id})
    }
};