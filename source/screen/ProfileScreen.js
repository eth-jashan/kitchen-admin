import React from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = ({navigation}) => {

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#ffde17'}}>
            <View style={{justifyContent:'center', alignSelf:'center', width:'100%'}}>
            <Image
                style={{height:200, width:200, alignSelf:'center', justifyContent:'center'}}
                source={{uri:'https://pps.whatsapp.net/v/t61.24694-24/138439538_247936526731668_6214712210083773155_n.jpg?ccb=11-4&oh=34c11671276c192536fcb23f9edba0db&oe=60A708C8'}}
            />
            </View>
            <Pressable onPress={()=>navigation.navigate('Creation')} style={{marginVertical:100, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Join as chef</Text>
            </Pressable>
        </SafeAreaView>
    )

}

export default ProfileScreen