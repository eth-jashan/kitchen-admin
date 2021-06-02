import React, { useState,useEffect } from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import * as profileAction from '../../store/action/profile'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper'

const OtpScreen = ({navigation, route}) => {

    const dispatch = useDispatch()

    // const {name,mail,phone,cuisine,types,address,useraddress, confirmation} = route.params
    const [code, setCode] = useState()

    useEffect( () => {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                // Obviously, you can add more statements here, 
                //       e.g. call an action creator if you use Redux. 
    
                // navigate the user away from the login screens: 
                console.log('Done')
            } 
            else 
            {
                // reset state if you need to  
                navigation.navigate('CuinsineSetting')
            }
        });
    }, []);  

    const createAccount = async() => {

        auth().signOut()
        navigation.navigate('CuinsineSetting')

    }


    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#ffde17'}}>
            <View style={{justifyContent:'center', alignSelf:'center', width:'100%'}}>
           <TextInput
               value={code}
               onChange={setCode}
           />
            </View>
            <Pressable onPress={createAccount} style={{marginVertical:100, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Join as chef</Text>
            </Pressable>
        </SafeAreaView>
    )

}

export default OtpScreen