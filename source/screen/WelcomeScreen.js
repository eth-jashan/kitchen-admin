import React from 'react'
import {View, Text, Image, Pressable, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons ,AntDesign} from '@expo/vector-icons';

const WelcomeScreen = ({navigation}) => {

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{justifyContent:'center', alignSelf:'center', width:'100%'}}>
            <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'50%'}} >
            <Text style={{fontFamily:'logo',fontSize:20,textAlign:'center',color:'black'}} >Welcome To <Text style={{fontFamily:'book',fontSize:20}} >Lokal Kitchen</Text></Text>
            <Image source={{uri:'https://static.wixstatic.com/media/5225cf_871c4f751a444e81beae1d2b782541fc~mv2.png/v1/fill/w_358,h_354,al_c,q_85,usm_0.66_1.00_0.01/QR%20Code%20Logo%20(1).webp'}} 
                style={{width:'50%',height:'100%',marginTop:20}}
            />
            </View>
            </View>
            <View style={{marginTop:50}} >
                <Text style={{fontFamily:'book',fontSize:18,color:'black',textAlign:'center'}}>Follow us on</Text>
                <View style={{flexDirection:'row',justifyContent:'center'}} >
                <AntDesign name="instagram" size={35} color="#8a3ab9" style={{margin:15}} />
                <AntDesign name="facebook-square" size={35} color="#4267B2" style={{margin:15}}  />
                <AntDesign name="twitter" size={35} color="#1DA1F2"  style={{margin:15}} />
                <AntDesign name="linkedin-square" size={35} color="#0077b5" style={{margin:15}}  />
                </View>
            </View>
            <View style={{left:0,right:0,bottom:5}} >
            <Pressable onPress={()=>navigation.navigate('Creation')} style={{ marginTop:20,backgroundColor:'#08818a', padding:4, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Join as Chef</Text>
            </Pressable>
            </View>
            <View style={{left:0,right:0,bottom:0}} >
            <Pressable onPress={()=>navigation.navigate('Otp')} style={{ marginTop:10,backgroundColor:'#08818a', padding:4, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Login as Chef</Text>
            </Pressable>
            </View>
            
        </SafeAreaView>
    )

}

export default WelcomeScreen