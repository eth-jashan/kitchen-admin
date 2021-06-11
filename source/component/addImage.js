import React from 'react'
import { Dimensions, Image,  Text, View,TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

const {width, height} = Dimensions.get('window')

const addImage = (props) => {
    const filePath = 'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/brooke-lark-HlNcigvUi4Q-unsplash.jpg?alt=media&token=c278eb9e-081e-4193-9dbe-febeb7fb8e68'

    return(
        
            <View style={{width:width*0.94, height:height*0.35, alignSelf:'center', borderRadius:8, marginVertical:8}}>
            <View style={{width:'100%', height:'100%', backgroundColor:'black', opacity:0.6, borderRadius:8}}>
            <Image
            blurRadius={props.img?null:4}
            style={{height:'100%', width:'100%', borderRadius:8}} 
            source={{uri:props.img?props.img:filePath}} 
        />
         <View style={{position:'absolute', justifyContent:'center',alignItems:'center',padding:10}}>
         <TouchableOpacity style={{backgroundColor:'#08818a',height:60,width:60,borderRadius:30,justifyContent:'center',alignItems:'center'}}  onPress = {props.onPress}>
            <Ionicons name="md-add" size={45} color="white" />
         </TouchableOpacity>
        </View>
        </View>
        </View>
        

    )
};

export default addImage;