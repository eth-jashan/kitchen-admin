export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'
export const ACCOUNT_SETUP = 'ACCOUNT_SETUP'
export const ADD_KYC = 'ADD_KYC'
export const CREATE='CREATE'
export const CHECK_USER='CHECK_USER'
export const FETCH_STATUS='FETCH_STATUS'

import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage';
import Kyc from '../../model/Kyc'

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

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

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
        saveDataToStorage(uid,token)
    }
}

export const accountSetup=(cuisine, type, geoAddress, house, landmark, pincode, city )=>{
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
                    city
                })
        })
        dispatch({type:ACCOUNT_SETUP,data:{
            cuisine, 
            // coords,
            geoAddress,
            house,
            landmark,
            pincode,
            city
        }})
    }
}

export const addKyc = (name,phone,adharURI,adharNo,fssiURI,fssiNo,panURI,panNo) => {
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
        for(const key in resData){
            list.push(new Kyc(resData[id].id,resData[id].name,resData[id].phone,resData[id].adharNo,resData[id].adharURI,resData[id].fssiNo,resData[id].fssiURI,resData[id].panNo,resData[id].panURI,
                resData[id].chefId,resData[id].status))
        }
        dispatch({type:FETCH_STATUS,data:list,uid:userid})

    }
}

const saveDataToStorage = (token,userId) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        userId:userId,
    }));
}