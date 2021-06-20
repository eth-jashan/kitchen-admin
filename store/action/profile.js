export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT'
export const ADD_CUISINE = 'ADD_CUISINE'
export const ACCOUNT_SETUP = 'ACCOUNT_SETUP'
export const ADD_KYC = 'ADD_KYC'

import storage from '@react-native-firebase/storage';

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

        const adhar = await fetch(adharURI);
        const fssi = await fetch(fssiURI);
        const pan = await fetch(panURI);

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
                adharURI:adharUrl,
                adharNo:adharNo,
                fssiURI:fssiUrl,
                fssiNo:fssiNo,
                panURI:panUrl,
                panNo:panNo
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
                panNo:panNo
        }})
    }
}