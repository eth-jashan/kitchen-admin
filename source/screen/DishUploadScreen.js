import React,{useState,useRef} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddImage from '../component/addImage';
import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';

const DishUploadScreen = (props) => {
    const[name,setName]=useState()
    const modalizeRef = useRef(null);
    const[description,setDescription]=useState()
    const[img,setImg]=useState()
    const[quantity,setQuantity]=useState()
    const[price,setPrice]=useState()
    const[serve,setServe]=useState()
    const onOpen = async() => {
        modalizeRef.current?.open();
    };
    const imagetaken=(url)=>{
        setImg(url)
    }
    //const SLIDER_WIDTH = Dimensions.get('screen').width;
    //const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
    
    return(
        <SafeAreaView style={{flex:1}} >
            <ScrollView>
            <View style={{backgroundColor:'#ffffff'}}>
                <AddImage text={'Add Images'} img={img} onPress = {onOpen}/>
            </View>
            <View style={{marginTop:10,borderTopLeftRadius:20,borderTopRightRadius:20}} >
                <ScrollView>
                <View style={{marginVertical:5, alignSelf:'center'}} >
                <TextInput
                value={name}
                onChangeText={setName}
                mode='flat'
                label="Enter Dish Name"
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    mode='flat'
                    label="Dish Description"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                <View style={{flexDirection:'column'}} >
                <View style={{margin:5}} >
                <TextInput
                    value={quantity}
                    onChangeText={setQuantity}
                    mode='flat'
                    keyboardType='number-pad'
                    label='Quantity'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                <View style={{margin:5}} >
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    mode='flat'
                    label='Price'
                    keyboardType='number-pad'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
 
                />
                </View>
                </View>
                <View style={{flexDirection:'row'}} >
                    <View style={{margin:5}} >
                    <TextInput
                        value={serve}
                        onChangeText={setServe}
                        mode='flat'
                        label='Maximum Serves'
                        keyboardType='number-pad'
                        theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                        style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
 
                    />
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10,marginHorizontal:10}} >
                <View >
                <Pressable onPress={()=>{}}  style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'100%', alignSelf:'center', justifyContent:'center'}} >
                <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center', color:'white'}} >Pre-Order</Text>
                </Pressable>
                </View>
                <View>
                <Pressable  style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'100%', alignSelf:'center', justifyContent:'center'}} >
                <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center', color:'white'}} >On-Demand</Text>
                </Pressable>
                </View>
                </View>
                <View style={{width:'100%'}} >
                <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Add Dish</Text>
                </Pressable>
                </View>
                </ScrollView>
            </View>
            
            <Modalize ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
            </ScrollView>
        </SafeAreaView>
    )
};

export default DishUploadScreen;