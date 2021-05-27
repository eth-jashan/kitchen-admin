import React, {useState, useRef, useEffect} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, Pressable, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

const{width, height} = Dimensions.get('window')

const CreationScreen = ({navigation}) => {

    const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [last, lastName] = useState('')
    const [mail, setMail] = useState('')
    

    const storeData = async () => {
        try {
          const jsonValue = JSON.stringify({name:name,mail:mail,phone:phone})
          await AsyncStorage.setItem('personalInfo', jsonValue)
        } 
        catch (e) {
          console.log('error:', e)
        }
    }
    
    const signIn = async() => {
        try {
          const confirmation = await auth().signInWithPhoneNumber("+919820769479");
          setConfirm(confirmation);
        } catch (error) {
          alert(error);
          console.log(error)
        }
    }
    ``
    useEffect(()=>{
        storeData()
    },[name,phone,mail])
    

    return(
        <SafeAreaView>
        
        <ScrollView style={{}} >
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
                label = 'Enter Mobile'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>
            <TextInput
                value={mail}
                onChangeText={setMail}
                type="flat"
                label = 'Enter Email'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>
            
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
            <View/>
                <Pressable onPress={()=>navigation.navigate('CuinsineSetting')} style={{backgroundColor:'#08818a', padding:8, borderRadius:8, width:60, alignSelf:'center', justifyContent:'center', height:60}}>
                <AntDesign  name="arrowright" size={30} color="white" style={{alignSelf:'center', justifyContent:'center'}}/>
                </Pressable>
            </View>
            
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default CreationScreen