import storage from '@react-native-firebase/storage';
import Banner from '../../model/Banner';


export const ADD_BANNER="ADD_BANNER"
export const DELETE_BANNER='DELETE_BANNER'
export const FETCH_BANNER='FETCH_BANNER'

export const addBanner=(name,description,img,dishid,catid,textid)=>{
    return async(dispatch,getState)=>{
        const uid=getState().profile.uid
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/banner.json?',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                description,
                 uid,
                dishid,
                catid,
                textid
            })
        })
        const resData=await response.json()
        const images = await fetch(img);
        const blob = await images.blob();
        const ref = storage().ref(`${'banner/'}${uid}${'/'}${resData.name}`);
        await ref.put(blob);
        const url= await storage().ref(`${'banner/'}${uid}${'/'}${resData.name}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/banner/${resData.name}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                imguri:url
            })
        })
        console.log(url)
        dispatch({type:ADD_BANNER,data:{
            id:resData.name,
            name,
            description,
            imguri:url,
            uid,
            dishid,
            catid,
            textid
        }})
    }
}



export const fetchBanner=()=>{
    return async (dispatch,getState)=>{
        const uid=getState().profile.uid
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/banner.json?')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Banner(key,resData[key].name,resData[key].description,resData[key].imguri,resData[key].uid,resData[key].dishid,resData[key].catid,resData[key].textid))
        }
        dispatch({type:FETCH_BANNER,data:list,uid:uid})
    }
}


export const deleteBanner = (id) => {
    return async(dispatch,getState) => {
        const uid=getState().profile.uid
        const ref = storage().ref(`${'banner/'}${uid}${'/'}${id}`);
            ref.delete()
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/banner/${id}.json`,{
            method:'DELETE'
        });
        dispatch({type:DELETE_BANNER,bannerId:id})
    }
};