import React,{useState} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'

const DishUploadScreen = (props) => {
    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState()
    const[quantity,setQuantity]=useState()
    const[price,setPrice]=useState()
    const[serve,setServe]=useState()
    //const SLIDER_WIDTH = Dimensions.get('screen').width;
    //const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
    
    return(
        <SafeAreaView style={{flex:1}} >
            <View style={{backgroundColor:'#ffffff'}}>
                
            </View>
            <View style={{marginTop:10,borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#D3D3D3'}} >
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
                <View style={{flexDirection:'row'}} >
                <View style={{margin:5}} >
                <TextInput
                    value={quantity}
                    onChangeText={setQuantity}
                    mode='flat'
                    keyboardType='number-pad'
                    label='Quantity'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a',height:70, width: Dimensions.get('screen').width*0.15, alignSelf:'center' }}
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
                    style={{ fontFamily: 'medium', fontColor: '#08818a',height:70, width: Dimensions.get('screen').width*0.55, alignSelf:'center' }}
 
                />
                </View>
                </View>
                <View style={{flexDirection:'row'}} >
                    <View style={{margin:5}} >
                    <Text>Maximum Serves: </Text>
                    </View>
                    <View style={{margin:5}} >
                    <TextInput
                        value={price}
                        onChangeText={setPrice}
                        mode='flat'
                        label='Price'
                        keyboardType='number-pad'
                        theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                        style={{ fontFamily: 'medium', fontColor: '#08818a',height:70, width: Dimensions.get('screen').width*0.45, alignSelf:'center' }}
 
                    />
                    </View>
                </View>
                <View style={{flexDirection:'row'}} >
                <View style={{margin:5}} >
                <Pressable onPress={}  style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'40%', alignSelf:'center', justifyContent:'center'}} >
                <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Pre-Order</Text>
                </Pressable>
                </View>
                <View style={{margin:5}} >
                <Pressable  style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'40%', alignSelf:'center', justifyContent:'center'}} >
                <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >On-Demand</Text>
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
        </SafeAreaView>
    )
};

export default DishUploadScreen;