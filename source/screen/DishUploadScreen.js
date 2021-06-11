import React,{useState} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'

const DishUploadScreen = (props) => {
    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState([])
    const SLIDER_WIDTH = Dimensions.get('screen').width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

    return(
        <SafeAreaView style={{flex:1}} >
            <View style={{height:Dimensions.get('screen').height*0.4,padding:20,backgroundColor:'#ffffff'}}>
                {img?<View style={{flexDirection:'row'}}>
                    <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, alignSelf:'center', justifyContent:'center'}} >
                        <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Add More Images</Text>
                    </Pressable>
                </View>:
                <View style={{alignSelf:'center'}} >
                <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, alignSelf:'center', justifyContent:'center'}} >
                <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Add Dish Image</Text>
                </Pressable>
                </View>}
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
                    value={description}
                    onChangeText={setDescription}
                    mode='flat'
                    label="Dish Description"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                <View style={{flexDirection:'row'}} >
                <View style={{margin:5}} >

                </View>
                <View style={{margin:5}} >

                </View>
                </View>
                <View style={{flexDirection:'row'}} >
                <View style={{margin:5}} >

                </View>
                <View style={{margin:5}} >

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