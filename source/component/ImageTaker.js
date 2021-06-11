import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image,TouchableOpacity,Dimensions,Pressable,Alert
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

  const fileHandler = async () => {
    const permission = await permissionsHandler();
    if (!permission) {
      return;
    }
    const imgFile = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All,quality: 1 });
    setImage(imgFile.uri);
    props.onImageTaken(imgFile.uri);
  };

  const cameraHandler = async () => {
    const permission = await permissionsHandler();
    if (!permission) {
      return;
    }
    const imgFile = await  ImagePicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[50,50],
        quality:1
    });
    setImage(imgFile.uri);
    props.onImageTaken(imgFile.uri);
  };

  return (
    <View>
    <Pressable onPress={fileHandler} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'80%', alignSelf:'center', justifyContent:'center',marginVertical:15}}>
        <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>From Device</Text>
    </Pressable>
    <Pressable onPress={cameraHandler} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'80%', alignSelf:'center', justifyContent:'center',marginVertical:15}}>
        <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Open Camera</Text>
    </Pressable>
    </View>
  );
};

export default ImageTaker;