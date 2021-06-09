import React, { useState,useEffect } from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import * as profileAction from '../../store/action/profile'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper'

const OtpScreen = ({navigation, route}) => {

    const dispatch = useDispatch()
    const {confirmation} = route.params
    const [code, setCode] = useState()

    const createAccount = async(code) => {
        console.log('Start')
        auth().onAuthStateChanged( async(user) => {
            if (user) {
                console.log("uid", auth().currentUser.uid)
                console.log("uid",await auth().currentUser.getIdToken(true))
                console.log('Done')
                navigation.navigate('CuinsineSetting')
            } 
            else 
            {
                try {
                   await confirmation.confirm(code)
                   navigation.navigate('CuinsineSetting')
                } catch (error) {
                    throw(error)
                }
            }})
    
        console.log('Done')
        
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