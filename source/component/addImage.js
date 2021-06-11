import React from 'react'
import { Dimensions, Image,  Text, View,TouchableOpacity } from 'react-native'

const {width, height} = Dimensions.get('window')

const addImage = (props) => {
    const filePath = 'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/brooke-lark-HlNcigvUi4Q-unsplash.jpg?alt=media&token=c278eb9e-081e-4193-9dbe-febeb7fb8e68'

    return(
        <TouchableOpacity onPress = {props.onPress}>
            <View style={{width:width*0.94, height:height*0.35, alignSelf:'center', borderRadius:8, marginVertical:8}}>
            <View style={{width:'100%', height:'100%', backgroundColor:'black', opacity:0.6, borderRadius:8}}>
            <Image
            blurRadius={4}
            style={{height:'100%', width:'100%', borderRadius:8}} 
            source={{uri:filePath}} 
        />
         <View style={{position:'absolute', padding:10}}>
            <Text style={{fontFamily:'medium', fontSize:20, color:'white',alignSelf:'center'}}>{props.text}</Text>
        </View>
        </View>
        </View>
        </TouchableOpacity>

    )
};

export default addImage;