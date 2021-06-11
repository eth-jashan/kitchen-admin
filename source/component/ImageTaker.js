import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image,TouchableOpacity,Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImageTaker = (props) => {
  const [image, setImage] = useState();

  const permissionsHandler = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA);
    if (permission.status != 'granted') {
      Alert.alert('Camera Permission', 'Required Camera Permission Not Granted !', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };

  const imageHandler = async () => {
    const permission = await permissionsHandler();
    if (!permission) {
      return;
    }
    
    const imgFile = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All,quality: 0.5 });
    setImage(imgFile.uri);

    props.onImageTaken(imgFile.uri);
    console.log(image);
  };

  return (
    <View>

      {!image ? <View></View> :
          <View style={{
   width: 100,margin:10, height: 100,justifyContent:'center',alignItems:'center'
    }} >
          <Image style={{ height: '100%', width: '100%'}} source={{ uri: image }} />
          </View>}
          <TouchableOpacity onPress={imageHandler} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, alignSelf:'center', justifyContent:'center'}}  >
         <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} ><Ionicons name="ios-camera" size={20} color="#ffffff" style={{borderRadius:10}} />{image?"Change Image":"Add Image"}</Text>
         </TouchableOpacity>
    </View>
  );
};

export default ImageTaker;