import React,{useState,useRef} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddImage from '../component/addImage';

import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';

const MenuCreationScreen = () => {
    const modalizeRef = useRef(null);

    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState()

    //const SLIDER_WIDTH = Dimensions.get('screen').width;
    //const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
    const imagetaken=(url)=>{
        setImg(url)
    }
    const onOpen = async() => {
        modalizeRef.current?.open();
    
    };


    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
            <View style={{padding:20}}>
                <AddImage  img={img} onPress = {onOpen}/>
            </View>
            <View>
            
            <View style={{marginVertical:10, alignSelf:'center'}} >
            <TextInput
                    value={name}
                    onChangeText={setName}
                    mode='flat'
                    label="Enter Dish Name"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />

                </View>
                <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    mode='flat'
                    label="Dish Description"
                    multiline={true}
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />

                </View>
            <View style={{width:'100%'}} >
                <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center',marginVertical:15}}>
                    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Add Dish</Text>
                </Pressable>
                </View>
                </View>

                
            </ScrollView>
            <Modalize ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
 

        </SafeAreaView>
        
    )
};

export default MenuCreationScreen;