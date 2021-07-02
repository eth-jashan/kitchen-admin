import React, { useState,useEffect } from 'react'
import {View, Text,TextInput,Dimensions, Image, Pressable, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import {Ionicons} from '@expo/vector-icons'
import * as profileAction from '../../store/action/profile'
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper'


const OtpScreen = ({navigation, route}) => {

    const dispatch = useDispatch()
    const[number,setNumber]=useState()
    const[confirm,setConfirm]=useState(false)
    const[loading,setloading]=useState(false)
    const [code, setCode] = useState()

    const onSubmit = async() => {
        try{
            setloading(true)
            let num  = "+91"+ number.toString()
            const confirmation = await auth().signInWithPhoneNumber(num);
            setConfirm(confirmation)
            setloading(false)
            setNumber(num);
        }
        catch(err){
            Alert.alert('An Error Occured',err.message,[{text:'Okay'}])

        }
    }

    const createAccount = async() => {
        try{
            setloading(true)
            const userid= auth().currentUser.uid
            const token=await auth().currentUser.getIdToken(true)
            await dispatch(profileAction.createaccount(userid,token))
            await dispatch(profileAction.checkuser(userid))
            setloading(false)
            navigation.navigate('Check')
        }
        catch(err){
            Alert.alert('Error',err.message,[{text:'Okay'}])
        }
        
    }
    
    if(confirm){
        return(
            <SafeAreaView style={{flex:1, backgroundColor:'#ffde17',justifyContent:'center',alignItems:'center'}} >
                <View>
            <Text style={{fontFamily:'book',fontSize:18,color:'black',margin:5,marginLeft:10}}>OTP has been sent to <Text style={{fontFamily:'bold', color:'#08818a'}} >{number}</Text></Text>
            <View style={{flexDirection:'row',width:Dimensions.get('screen').width*0.95,margin:10,borderRadius:20,backgroundColor:'#ededee'}} >
            <View style={{marginTop:20,margin:5}} >
            <Ionicons name='phone-portrait-outline' size={30} />
            </View>
            <View style={{padding:5,justifyContent:'center',alignItems:'center'}} >
            <TextInput
            value={code}
            keyboardType='number-pad'
            onChangeText={setCode}
            placeholder = 'Enter the OTP'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={createAccount} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
                {loading?<ActivityIndicator size='small' color='#ffffff' />:<Ionicons name='arrow-forward' color='white' size={25} />}
                </Pressable>
            </View>
            </View>
            </View>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{marginTop:50,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',width:'100%'}} >
            <View style={{marginLeft:15,marginTop:10}} >
            <Text style={{fontFamily:'logo',color:'black',fontSize:18}} >Welcome Chef!</Text>
            <Text style={{fontFamily:'book',fontSize:18}}>Sign In To Continue</Text>
            </View>
            <View style={{marginRight:15,marginTop:10}}  >
            <Ionicons size={50} name='fast-food-outline' color='black' />
            </View>
            </View>
            <View style={{flexDirection:'row',margin:10,width:Dimensions.get('screen').width*0.95,borderRadius:20,backgroundColor:'#ededee'}} >
            <View style={{marginTop:20,margin:5}} >
            <Ionicons name='phone-portrait-outline' size={30} />
            </View>
            <View style={{padding:5,justifyContent:'center',alignItems:'center'}} >
            <TextInput
            value={number}
            keyboardType='phone-pad'
            onChangeText={setNumber}
            placeholder = 'Enter the Mobile Number'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={onSubmit} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
                {loading?<ActivityIndicator size='small' color='#ffffff' />:<Ionicons name='arrow-forward' color='white' size={25} />}
                </Pressable>
            </View>
            
            </View>
            </SafeAreaView>
    )

}

export default OtpScreen