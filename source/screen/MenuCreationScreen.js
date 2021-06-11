import React,{useState} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'

const MenuCreationScreen = () => {
    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState([])
    const[isImage,setIsImage] = useState(true);

    const SLIDER_WIDTH = Dimensions.get('screen').width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

    const renderCat=itemData=>{
        return(
            <View>
                <Image/>
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{height:Dimensions.get('screen').height*0.4,padding:20,backgroundColor:isImage? '#ffffff':null}}>
            {img?<View style={{flexDirection:'column',alignSelf:'center'}}>
                    <Carousel
                        data={img}
                        renderItem={renderCat}
                        layout={'default'}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                    />
                    <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, alignSelf:'center', justifyContent:'center'}} >
                        <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Add Images</Text>
                    </Pressable>
                </View>:
                <View >
                <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8}} >
                <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Add Dish Image</Text>
                </Pressable>
                </View>}
            </View>
            <View style={{width:'100%'}} >
                <Pressable style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Add Dish</Text>
                </Pressable>
                </View>
        </SafeAreaView>
    )
};

export default MenuCreationScreen;