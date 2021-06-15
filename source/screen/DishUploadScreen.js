import React,{useState,useRef} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image, FlatList ,TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import AddImage from '../component/addImage';
import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';
import {useDispatch, useSelector} from 'react-redux'
import * as dishAction from '../../store/action/dish'

const {width, height} = Dimensions.get('window')

const DishUploadScreen = (props) => {
    const cuisine = useSelector(x => x.dish.cuisine)
    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState()
    const[quantity,setQuantity]=useState()
    const[price,setPrice]=useState()
    const[serve,setServe]=useState()
    const [spicy, setSpicy] = useState(0)

    const modalizeRef = useRef(null);
    const dispatch = useDispatch()
    

    const onOpen = async() => {
        modalizeRef.current?.open();
    };

    const imagetaken=(url)=>{
        setImg(url)
    }

    const uploadDish=async()=>{
        if(name && description && price && spicy && serve && quantity && cuisine.length!=0)
        {
            await dispatch(dishAction.addDish(name,description,img,spicy,price,serve,quantity))
        }
        else{
            Alert.alert('Error','Please Add all the details',[{text:'Okay'}])
        }
    }

    const cuisineHandler = (name) => {

        dispatch(dishAction.addCuisine(name))
    
    }
    const spicyHandler = (index) => {
        setSpicy(index)
    }

    
    const spicyList = [{title:'no spicy 😚'},{title:'less spicy😌'}, {title:'medium spicy😓'}, {title:'high spicy🤐'}] 
    const cuisineList= [

        {title:'Breakfast', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fchinese-C.jpg?alt=media&token=31600780-81bb-42ac-ad56-34a8dad6e3eb'},{title:"Appetizer", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Findian%20C.jpg?alt=media&token=a43b190c-6537-47a9-88d2-941141d3bfbf"}, {title:"Maincourse", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSeafood%20c.jpg?alt=media&token=303fd2c3-960e-42f2-84c1-e26010278947"}, {title:'Thali/Meal', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmaharashtrain%20C.png?alt=media&token=24920057-ce78-457d-8908-b7da35ba260b'},
        {title:'Desert', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSouth%20Indian%20Cuisine.jpg?alt=media&token=781238cd-09a0-4b31-86a1-c1f9e6876766'}]
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}} >
            <ScrollView>
            <View style={{backgroundColor:'#ffffff'}}>
                <AddImage img={img} onPress = {onOpen}/>
            </View>
            <View style={{marginTop:10, backgroundColor:'white'}} >
                
                <View style={{marginVertical:5, alignSelf:'center'}} >
                <TextInput
                value={name}
                onChangeText={setName}
                mode='flat'
                label="Name of your dish"
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
                    label="Give a one line description for your dish"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={cuisineList}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item}) => {
                    return<TouchableOpacity onPress={()=>cuisineHandler(item.title)}>
                    <View style={{width:width*0.6, padding:8, borderRadius:8, alignSelf:'center', height:180}}>
                        <Image
                            
                            style={{width:'100%', height:'90%',borderRadius:8, opacity:cuisine.includes(item.title)?1:0.2}}
                            source={{uri:item.link}}
                        />
                        <View style={{position:'absolute', bottom:30, left:20}}>
                        <Text style={{ fontFamily:'medium', fontSize:18, color:cuisine.includes(item.title)?"white":'black'}}>{item.title}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                }}
            />
            
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={spicyList}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>spicyHandler(index)} style={{backgroundColor:index===spicy?'#ec0c41':null, width:150, padding:8, borderRadius:10, marginHorizontal:6, }}>
                    <Text style={{fontFamily:'book', fontSize:20, color:index===spicy?'white':"black", alignSelf:'center'}}>{item.title}</Text>
                    </TouchableOpacity>
                }}
            />

            <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    multiline
                    value={price}
                    onChangeText={setPrice}
                    mode='flat'
                    label="Cost of one dish?"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
            </View>

            <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    multiline
                    value={serve}
                    onChangeText={setServe}
                    mode='flat'
                    label="One portion serves how many people? (for eg. 1-2)"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
            </View>

            <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    multiline
                    value={quantity}
                    onChangeText={setQuantity}
                    mode='flat'
                    label="Total number of quantity tobe served (for eg. 10,50,etc.)"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
            </View>

            <View style={{width:'100%', marginVertical:16}}>
                <Pressable onPress={uploadDish} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Add Dish</Text>
                </Pressable>
            </View>

           
            </View>
            </ScrollView>
            <Modalize  ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
        </SafeAreaView>
    )
};

export default DishUploadScreen;