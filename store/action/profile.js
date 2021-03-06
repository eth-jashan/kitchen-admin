export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'
export const ACCOUNT_SETUP = 'ACCOUNT_SETUP'
export const ADD_KYC = 'ADD_KYC'
export const CREATE='CREATE'
export const CHECK_USER='CHECK_USER'
export const FETCH_STATUS='FETCH_STATUS'
export const FETCH_CHEF = 'FETCH_CHEF';
export const UPDATE_CHEF='UPDATE_CHEF'
export const USER_CUISINE='USER_CUISINE'
export const USER_RECOMMEDED='USER_RECOMMEDED'
export const ADD_RECOMMEDED='ADD_RECOMMEDED'

import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage';
import Chef from '../../model/Chef'
import Kyc from '../../model/Kyc'
import Profile from '../../model/Profile'

export const createaccount=(uid,token)=>{
    return async (dispatch)=>{
        dispatch({type:CREATE,userid:uid,tokenid:token})        
    }
}


export const checkuser = (uid) => {

    return async (dispatch, getState)=>{

        const response = await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/check.json')
        const resData = await response.json()
        const uidList = []

        for(const key in resData){ 
            uidList.push(resData[key].uid)
        }
        console.log('Checkkkk-------', uidList.includes(uid.toString()))
        dispatch({type:CHECK_USER, status:uidList.includes(uid.toString())})
        
    }

}


export const addUserCuisine=(data)=>{
    return async(dispatch)=>{
        dispatch({type:USER_CUISINE,data:data})
    }
}

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}

export const addUserRecommeded=(data)=>{
    return async(dispatch)=>{
        dispatch({type:USER_RECOMMEDED,data:data})
    }
}

export const addRecommeded = (id) => {

    return async (dispatch, getState) => {
        console.log('name', id)
        dispatch({type:ADD_RECOMMEDED, id:id})

    }

}

export const createAccount=(name,email,phone, uid, token)=>{
    return async(dispatch,getState)=>{
        
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile.json?`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                email,
                phone,
                created:false,
                kyc:false,
                uid:uid
            })
        })
        const resData=await response.json()
        const response2=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/check.json?',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                uid:uid
            })
        })
        dispatch({type:SIGNUP_ACCOUNT,data:{
            id:resData.name,
            name,
            email,
            phone,
            created:false,
            kyc:false,
            uid:uid,
            token:token
        }})
        saveDataToStorage(uid,token,resData.name,false)
    }
}

export const accountSetup=(cuisine, type, geoAddress, house, landmark, pincode, city,lat,long )=>{
    return async(dispatch,getState)=>{
        const id = getState().profile.profileId
        const uid = getState().profile.uid

        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
                method:'PATCH',
                headers:{'Content-Type':'application\json'},
                body:JSON.stringify({
                    cuisine, 
                    // coords,
                    geoAddress,
                    house,
                    landmark,
                    pincode,
                    city,
                    created:true,
                    lat:lat,
                    long:long
                })
        })
        dispatch({type:ACCOUNT_SETUP,data:{
            cuisine, 
            // coords,
            geoAddress,
            house,
            landmark,
            pincode,
            city,
            lat,
            long
        }})
    }
}

export const addKyc = (name,phone,adharURI,adharNo,fssiURI,fssiNo,panURI,panNo,bankname,branch,accName,accno,ifsc) => {
    return async (dispatch,getState) => {

         const uid = getState().profile.uid
        console.log(uid)

        const adhar = await fetch(adharURI.uri);
        const fssi = await fetch(fssiURI.uri);
        const pan = await fetch(panURI.uri);

        const adharBlob = await adhar.blob();
        const fssiBlob = await fssi.blob();
        const panBlob = await pan.blob();

        const adharRef = storage().ref(`${'kyc/'}${uid}${'/'}${'adhar/'}`);
        const fssiRef = storage().ref(`${'kyc/'}${uid}${'/'}${'fssi/'}`);
        const panRef = storage().ref(`${'kyc/'}${uid}${'/'}${'pan/'}`);
       
        
        await adharRef.put(adharBlob);
        await fssiRef.put(fssiBlob);
        await panRef.put(panBlob);

        const adharUrl = await storage().ref(`${'kyc/'}${uid}${'/'}${'adhar/'}`).getDownloadURL();
        const fssiUrl = await storage().ref(`${'kyc/'}${uid}${'/'}${'fssi/'}`).getDownloadURL();
        const panUrl = await storage().ref(`${'kyc/'}${uid}${'/'}${'pan/'}`).getDownloadURL();
        

        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/kyc.json`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name:name,
                phone:phone,
                adharURI:[{link:adharUrl,filename:adharURI.name}],
                adharNo:adharNo,
                fssiURI:[{link:fssiUrl,filename:fssiURI.name}],
                fssiNo:fssiNo,
                panURI:[{link:panUrl,filename:panURI.name}],
                panNo:panNo,
                Bank:bankname,
                Branch:branch,
                AccName:accName,
                AccNo:accno,
                IFSC:ifsc,
                chefId:uid,
                status:"Under Verification"
            })
        })
        const resData= await response.json();
        dispatch({type:ADD_KYC,kycDetails:{
            id:resData.name,
            phone:phone,
                adharURI:adharUrl,
                adharNo:adharNo,
                fssiURI:fssiUrl,
                fssiNo:fssiNo,
                panURI:panUrl,
                panNo:panNo,
                Bank:bankname,
                Branch:branch,
                AccName:accName,
                AccNo:accno,
                IFSC:ifsc,
                chefId:uid,
                status:"Under Verification"
        }})
    }
}

export const fetchKyc=()=>{
    return async(dispatch,getState)=>{
        const userid=getState().profile.uid
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/kyc.json')
        const resData=await response.json()
        const list=[]
        console.log(resData)
        for(const key in resData){
            list.push(new Kyc(key,resData[key].name,resData[key].phone,resData[key].adharNo,resData[key].adharURI,resData[key].fssiNo,resData[key].fssiURI,resData[key].panNo,resData[key].panURI,
                resData[key].Bank,resData[key].Branch,resData[key].AccName,resData[key].Accno,resData[key].IFSC,resData[key].chefId,resData[key].status,resData[key].reason))
        }
        dispatch({type:FETCH_STATUS,data:list,uid:userid})

    }
}

const saveDataToStorage = (token,userId,id,created) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        userId:userId,
        id:id,
        created:created
    }));
}


export const fetchSpecificChef = () => {
    return async(dispatch,getState) => {
        const chefUid = getState().profile.uid
        const response = await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile.json?')
        const resData=await response.json()
        const profiles = []
        for(const key in resData){
            console.log(resData[key])
            profiles.push(new Chef(key,
                resData[key].name,
                resData[key].email,
                resData[key].phone,
                resData[key].cuisine,
                resData[key].landmark,
                resData[key].geoAddress,
                resData[key].house,
                resData[key].created,
                resData[key].kyc,
                resData[key].uid,
                resData[key].city,
                resData[key].lat,
                resData[key].long,
                resData[key].pincode,
                resData[key].imguri,
                resData[key].bguri,
                resData[key].Recommeded
                
                ))
        }

        dispatch({type:FETCH_CHEF,pData:profiles,uid:chefUid})
    }
}

export const updateChef=(id,name,imguri,bguri,cuisine,recommeded)=>{
    return async dispatch=>{
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`)
        const resData=await response.json()
        if(resData.imguri==undefined && resData.bguri==undefined)
        {
            const images1 = await fetch(imguri);
        const blob1 = await images1.blob();
        const ref1 = storage().ref(`${'profileimg/'}${id}`);
        await ref1.put(blob1);
        const imgurl= await storage().ref(`${'profileimg/'}${id}`).getDownloadURL();
        const images2 = await fetch(bguri);
        const blob2 = await images2.blob();
        const ref2 = storage().ref(`${'backgroundimg/'}${id}`);
        await ref2.put(blob2);
        const bgurl= await storage().ref(`${'backgroundimg/'}${id}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
            method:'PATCH',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                name:name,
                imguri:imgurl,
                bguri:bgurl,
                cuisine:cuisine,
                Recommeded:recommeded

            })
            
        })
        dispatch({type:UPDATE_CHEF,data:{
            id,
            name,
            imguri:imgurl,
            bguri:bgurl,
            cuisine,
            recommeded
        }})
        }
        if(resData.imguri==imguri && resData.bguri==bguri)
        {
            await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
                method:'PATCH',
                headers:{"Content-Type":'application/json'},
                body:JSON.stringify({
                    name:name,
                    cuisine:cuisine,
                    Recommeded:recommeded
    
                })
                
            })
            dispatch({type:UPDATE_CHEF,data:{
                id,
                name,
                cuisine,
                recommeded
            }})  
        }
        if(resData.imguri!=imguri && resData.bguri!=bguri)
        {
            const rf1 = storage().ref(`${'profileimg/'}${id}`);
            rf1.delete()
            const rf2 = storage().ref(`${'backgroundimg/'}${id}`);
            rf2.delete()
        const images1 = await fetch(imguri);
        const blob1 = await images1.blob();
        const ref1 = storage().ref(`${'profileimg/'}${id}`);
        await ref1.put(blob1);
        const imgurl= await storage().ref(`${'profileimg/'}${id}`).getDownloadURL();
        const images2 = await fetch(bguri);
        const blob2 = await images2.blob();
        const ref2 = storage().ref(`${'backgroundimg/'}${id}`);
        await ref2.put(blob2);
        const bgurl= await storage().ref(`${'backgroundimg/'}${id}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
            method:'PATCH',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                name:name,
                imguri:imgurl,
                bguri:bgurl,
                cuisine:cuisine,
                Recommeded:recommeded

            })
            
        })
        dispatch({type:UPDATE_CHEF,data:{
            id,
            name,
            imguri:imgurl,
            bguri:bgurl,
            cuisine,
            recommeded
        }})

        }
        if(resData.imguri!=imguri  && resData.bguri==bguri ){
            const rf1 = storage().ref(`${'profileimg/'}${id}`);
            rf1.delete()
        const images1 = await fetch(imguri);
        const blob1 = await images1.blob();
        const ref1 = storage().ref(`${'profileimg/'}${id}`);
        await ref1.put(blob1);
        const imgurl= await storage().ref(`${'profileimg/'}${id}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
            method:'PATCH',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                name:name,
                imguri:imgurl,
                bguri,
                cuisine:cuisine,
                Recommeded:recommeded

            })
            
        })
        dispatch({type:UPDATE_CHEF,data:{
            id,
            name,
            imguri:imgurl,
            bguri,
            cuisine,
            recommeded
        }})
        }
        else{
            const rf2 = storage().ref(`${'backgroundimg/'}${id}`);
            rf2.delete()
        const images2 = await fetch(bguri);
        const blob2 = await images2.blob();
        const ref2 = storage().ref(`${'backgroundimg/'}${id}`);
        await ref2.put(blob2);
        const bgurl= await storage().ref(`${'backgroundimg/'}${id}`).getDownloadURL();
        await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile/${id}.json?`,{
            method:'PATCH',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                name:name,
                imguri,
                bguri:bgurl,
                cuisine:cuisine,
                Recommeded:recommeded

            })
            
        })
        dispatch({type:UPDATE_CHEF,data:{
            id,
            name,
            imguri,
            bguri:bgurl,
            cuisine,
            recommeded
        }})
        }
        
        
    }
}