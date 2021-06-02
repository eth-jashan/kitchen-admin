export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'
export const UPDATE_ACC='UPDATE_ACC'
export const ADD_KYC = 'ADD_KYC'

import storage from '@react-native-firebase/storage';

export const addCuisine = (name) => {

    return async (dispatch, getState) => {
        console.log('name', name)
        dispatch({type:ADD_CUISINE, name:name})

    }

}

export const createAccount=(name,email,phone,cuisine,type,address,useraddress)=>{
    return async(dispatch,getState)=>{
        
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Chef.json?',{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                name,
                email,
                phone,
                cuisine,
                type,
                address,
                useraddress,
                created:true,
                Kyc:false
            })
        })
        const resData=await response.json()

        dispatch({type:SIGNUP_ACCOUNT,data:{
            id:resData.name,
            name,
            email,
            phone,
            cuisine,
            type,
            address,
            useraddress,
            created:true,
            kyc:false
        }})
    }
}

export const UpdateChef=(id,email,cuisine,type)=>{
    return async(dispatch,getState)=>{
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Chef/${id}.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({
                email,
                cuisine,
                type
            })
        })
        dispatch({type:UPDATE_ACC,cid:id,data:{
            email,
            cuisine,
            type
        }})
    }
}

export const addKyc = (name,phone,adharURI,adharNo,fssiURI,fssiNo,panURI,panNo) => {
    return async (getState,dispatch) => {

        const uid = getState.auth.userId;

        const adhar = await fetch(adharURI);
        const fssi = await fetch(fssiURI);
        const pan = await fetch(panURI);

        const adharBlob = await adhar.blob();
        const fssiBlob = await fssi.blob();
        const panBlob = await pan.blob();

        const adharRef = storage.ref(`${'kyc/'}${uid}${'/'}${'adhar'}`);
        const fssiRef = storage.ref(`${'kyc/'}${uid}${'/'}${'fssi'}`);
        const panRef = storage.ref(`${'kyc/'}${uid}${'/'}${'pan'}`);
        
        await adharRef.put(adharBlob);
        await fssiRef.put(fssiBlob);
        await panRef.put(panBlob);

        const adharUrl = await storage.ref(`${'kyc/'}${uid}${'/'}${'adhar'}`).getDownloadURL();
        const fssiUrl = await storage.ref(`${'kyc/'}${uid}${'/'}${'fssi'}`).getDownloadURL();
        const panUrl = await storage.ref(`${'kyc/'}${uid}${'/'}${'pan'}`).getDownloadURL();

        const response  = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/Chef/${id}/details.json?`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringfy({
                name,
                phone,
                adharNo,
                adharURL:adharUrl,
                fssiNo,
                fssiURL:fssiUrl,
                panNo,
                panURL:panUrl
            })
        })
        const resData=await response.json();
        dispatch({type:ADD_KYC,kycDetailes:{
            id:resData.name,
            name,
            phone,
            adharNo,
            adharURL:adharUrl,
            fssiNo,
            fssiURL:fssiUrl,
            panNo,
            panURL:panUrl
        }})
    }
}