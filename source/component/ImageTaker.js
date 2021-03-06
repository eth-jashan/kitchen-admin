import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image,TouchableOpacity,Dimensions,Pressable,Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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

  const fileHandler = async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!permission) {
      return;
    }
    const imgFile = await ImagePicker.launchImageLibraryAsync({ allowsEditing:true,
     mediaTypes: ImagePicker.MediaTypeOptions.Images,quality: 1 });
    setImage(imgFile.uri);
    props.onImageTaken(imgFile.uri);
  };

  const cameraHandler = async () => {
    const permission = await ImagePicker.getCameraPermissionsAsync();
    if (!permission) {
      return;
    }
    const imgFile = await  ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        quality:1
    });
    setImage(imgFile.uri);
    props.onImageTaken(imgFile.uri);
  };

  return (
    <View>
    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', marginVertical:16, color:'black'}}>Image Uploads</Text>
    <Pressable onPress={fileHandler} style={{borderColor:'gray', borderBottomWidth:1, padding:8, borderRadius:8, width:'100%', alignSelf:'center', marginVertical:15, flexDirection:'row', justifyContent:'space-between'}}>
    <Entypo name="images" size={24} color="#08818a" style={{left:20}} />
    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'#08818a',right:20}}>From Device</Text>
    </Pressable>
    <Pressable onPress={cameraHandler} style={{borderColor:'gray',borderBottomWidth:1, padding:8, borderRadius:8, width:'100%', alignSelf:'center', marginVertical:15, flexDirection:'row', justifyContent:'space-between'}}>
    <Entypo name="camera" size={24} color="#08818a" style={{left:20}} />
        <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'#08818a', right:20}}>Open Camera</Text>
    </Pressable>
    </View>
  );
};

export default ImageTaker;