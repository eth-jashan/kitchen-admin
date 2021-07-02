import React, { useEffect } from 'react'
import {View} from 'react-native'
import { useSelector } from 'react-redux'

const CheckScreen=props=>{
    const user=useSelector(x=>x.profile.status)
    const loginTransform = () => {
        if(user){
            props.navigation.navigate('Main')   
        }else{
            
            //await dispatch(register(false,number,userId,token))
            //navigation.navigate('Profile',{type:'Phone',pNumber:number})
        }
    }
    useEffect(()=>{
        loginTransform()
    },[loginTransform])
    return(
        <View></View>
    )
}

export default CheckScreen