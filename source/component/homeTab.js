import React from 'react'
import { Dimensions, Image,  Text, View,TouchableOpacity } from 'react-native'

const {width, height} = Dimensions.get('window')

const HomeTab = ({text, stext, index, OnPress}) => {

    const filePath = [
        'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/brooke-lark-HlNcigvUi4Q-unsplash.jpg?alt=media&token=c278eb9e-081e-4193-9dbe-febeb7fb8e68',
        'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/charles-deluvio-PqsImnjuElM-unsplash.jpg?alt=media&token=65e263cd-4699-48b9-9a1e-1c6bc05e8ca8',
        'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/tamanna-rumee-R4viFLEqOWU-unsplash.jpg?alt=media&token=f63a6543-3d48-4996-8a6a-fdea385cbffc',
    'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/daniel-bradley-y_WDEY9e6mA-unsplash.jpg?alt=media&token=8b31c2eb-aeec-4545-bc2e-fb4c7e837e56']

    return(<TouchableOpacity onPress={OnPress}>
        <View style={{width:width*0.94, height:height*0.25, alignSelf:'center', borderRadius:8, marginVertical:8}}>
        <View style={{width:'100%', height:'100%', backgroundColor:'black', opacity:0.6, borderRadius:8}}>
        <Image
            blurRadius={5}
            style={{height:'100%', width:'100%', borderRadius:8}} 
            source={{uri:filePath[index]}} 
        />
        </View>
        <View style={{position:'absolute', padding:10}}>
            <Text style={{fontFamily:'medium', fontSize:20, color:'white'}}>{text}</Text>
            <Text style={{fontFamily:'book', fontSize:18, color:'white'}}>{stext}</Text>
        </View>
            
        </View>
        </TouchableOpacity>
    )

}

export default HomeTab