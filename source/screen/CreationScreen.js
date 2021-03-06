import React, {useState, useRef, useEffect} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, Pressable, Alert,Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import * as profileAction from '../../store/action/profile'
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

const{width, height} = Dimensions.get('window')

const CreationScreen = ({navigation}) => {

    
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const[disable,setDisable]=useState(false)
    const[loading,setloading]=useState(false)
    const [confirm, setConfirm] = useState(false)
    const [code, setCode] = useState()
    const dispatch = useDispatch()
    
    const onSubmit = async() => {
        if(!name || !mail || !phone){
            Alert.alert('Input Error','Please Enter all Required Inputs',[{text:'Okay'}])
        }
        else{
            try {
                setloading(true)
                let number  = "+91"+ phone.toString() 
                const confirmation = await auth().signInWithPhoneNumber(number);
                setConfirm(confirmation)
                setloading(false)
                // navigation.navigate('Otp',{confirmation:confirmation, name:name, mail:mail, number:number})
        
              } catch (error) {
                alert(error);
                console.log(error)
            }
        }
    
        // navigation.navigate('Main')
    }   

    const createAccount = async() => {
        console.log('Start')
        setDisable(true)
            auth().onAuthStateChanged( async(user) => {
            if (user) {
                setloading(true)
                const uid = auth().currentUser.uid                
                const token = await auth().currentUser.getIdToken(true)
                await dispatch(profileAction.createAccount(name, mail, phone, uid, token ))
                setloading(false)
                navigation.navigate('CuinsineSetting')
            } 
            else 
            {
                try {
                   await confirm.confirm(code)
                   navigation.navigate('CuinsineSetting')
                } catch (error) {
                    throw(error)
                }
            }})
        setDisable(false)
       
        console.log('Done')
        
    }

    if(confirm){

        return(
            <SafeAreaView style={{flex:1, backgroundColor:'#ffde17',justifyContent:'center',alignItems:'center'}}>
            <View style={{alignSelf:'center', marginTop:22}}>
                <Text style={{fontFamily:'book', color:'black', fontSize:20}}>Hello <Text style={{fontFamily:'book', color:'#08818a'}}>{`${name}`}</Text></Text>
                <Text style={{fontFamily:'medium', color:'black', fontSize:22}}>Otp sent to <Text style={{fontFamily:'book', color:'#08818a',fontSize:22}}>{phone}</Text></Text>
            </View>
            <View style={{marginVertical:12, alignSelf:'center'}}>
            <TextInput
                value={code}
                onChangeText={setCode}
                type="flat"
                label = 'Enter Code'
                keyboardType='number-pad'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            <Pressable onPress={createAccount} disabled={disable} style={{margin:10,backgroundColor:'#08818a', padding:8, borderRadius:8, width:Dimensions.get('screen').width*0.90, alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Proceed</Text>
            </Pressable>
            </View>
            </SafeAreaView>
        )

    }

    return(
        <SafeAreaView style={{flex:1}}>
        
        <ScrollView>
            <Image
                style={StyleSheet.absoluteFillObject}
                source={require('../../android/app/src/main/assets/image/vector-yellow-abstract-background.jpg')}
            />
            <View style={{width:'100%', padding:10, justifyContent:'space-between'}}>
            <Ionicons onPress={()=>navigation.navigate('Welcome')} name="arrow-back" size={30} color="white" />
            </View>
            <View style={{width:'100%', padding:10}}>
                <Text style={{fontFamily:'black', color:'white', fontSize:30}}>0% <Text style={{fontFamily:'light', fontSize:20}}>completed</Text></Text>
                <Text style={{fontFamily:'black', color:'white', fontSize:24, marginVertical:8}}>Personal Details</Text>
                {/* <View style={{borderWidth:2, borderColor:'white', borderRadius:20, width:'30%', backgroundColor:'white'}}/> */}
            </View>
            <View style={{width:width, height:height*0.9,  backgroundColor:'white', top:height*0.1, borderTopLeftRadius:20, borderTopRightRadius:20, padding:10}}>
            
            <View style={{marginTop:30, marginHorizontal:10}}>
                <Text style={{fontFamily:'medium', fontSize:30, color:'black'}}>Signup as Chef</Text>
                <Text style={{fontFamily:'book', fontSize:18, marginTop:4}}>Enter your credential information</Text>
            </View>
            
            <View style={{marginTop:30, marginBottom:24}}>

            <TextInput
                type="flat"
                onChangeText={setName}
                label = 'Enter Name'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            <View style={{marginVertical:12}}>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                type="flat"
                keyboardType='number-pad'
                label = 'Enter Mobile'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>
            <TextInput
                value={mail}
                onChangeText={setMail}
                type="flat"
                keyboardType='email-address'
                label = 'Enter Email'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>
            
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
            <View/>
                <Pressable onPress={onSubmit} style={{backgroundColor:'#08818a', padding:8, borderRadius:8, width:60, alignSelf:'center', justifyContent:'center', height:60}}>
                {loading?<ActivityIndicator size='small' color='#ffffff' />:<AntDesign  name="arrowright" size={30} color="white" style={{alignSelf:'center', justifyContent:'center'}}/>
}
                </Pressable>
            </View>
            
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default CreationScreen