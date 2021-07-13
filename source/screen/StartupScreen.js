import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useCallback } from 'react'
import {View,ActivityIndicator} from 'react-native'
import { useDispatch } from 'react-redux';
import { createaccount } from '../../store/action/profile';


const StartupScreen=props=>{
    const dispatch = useDispatch();

    const Authenticate = useCallback( async(userId,token) =>{
        await dispatch(createaccount(userId,token))
        
        props.navigation.navigate('Main')

    },[dispatch])
    useEffect(()=>{
        const login=async()=>{
            const userData = await AsyncStorage.getItem('userData');
        if(!userData){
            props.navigation.navigate('Welcome')
            return;
        }
        const transformedData = JSON.parse(userData);
        const {token,userId,id,created} = transformedData;
        console.log(token,userId,created)
        if(!created){
            props.navigation.navigate("CuinsineSetting")
        }
        else{
            Authenticate(userId,token)
        }
        }
        login()
    },[dispatch])
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <ActivityIndicator color='#08818a' size='large' />
        </View>
    )
}

export default StartupScreen