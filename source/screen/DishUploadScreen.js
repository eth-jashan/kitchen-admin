import React,{useState,useRef,useEffect} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image, FlatList ,TouchableOpacity, Alert,ToastAndroid,Platform,AlertIOS} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import AddImage from '../component/addImage';
import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';
import {useDispatch, useSelector} from 'react-redux'
import * as dishAction from '../../store/action/dish'
import TimeOrder from '../component/TimingOrder';
import { set } from 'react-native-reanimated';
import * as Location from 'expo-location';



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
    const [type, setType] = useState(0)
    const[food,setFood]=useState(0)
    const [location, setLocation] = useState(null);
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const[foundLocation,setFoundLocation] = useState(false);
    const[loading,setloading]=useState(false)

    const modalizeRef = useRef(null);
    const modalizeRef2 = useRef(null);
    const {data,types}=props.route.params
    const dispatch = useDispatch()
    const spicyList = [{title:'Spicy🥵'},{title:'Sweet🍬'}, {title:'Bitter😓'}, {title:'Sour😖'}, {title:'Salty🧂'}] 

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
    
        })();
      }, []);
    

    useEffect(()=>{
        startMap();
        if(types === 'Edit'){
            setName(data.name)
            setDescription(data.description)
            setImg(data.imguri)
            setQuantity(data.quantity)
            setPrice(data.price)
            setServe(data.noServe)
            setSpicy(spicyList.findIndex(x=>x.title==data.spicy.title))
            setType(data.type)
            
        }
    },[foundLocation])
    const startMap = async() => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude) 
        setFoundLocation(true)
    }

    const onOpen = async() => {
        modalizeRef.current?.open();
    };
    const onOpen2 = async() => {
        modalizeRef2.current?.open();
    };
    const imagetaken=(url)=>{
        setImg(url)
        modalizeRef.current?.close();
    }

    const uploadDish=async()=>{

            if(types === 'Edit'){
                setloading(true)
                await dispatch(dishAction.imageCheck(data.id,name,description,img,spicyList[spicy],price,serve,quantity,type,latitude,longitude,food))
                setloading(false)
                
            }
            else{
                setloading(true)
                await dispatch(dishAction.addDish(name,description,img,spicyList[spicy],price,serve,quantity,type,latitude,longitude,food))
                setloading(false)
                
            }
            
    }

    const cuisineHandler = (name) => {

        dispatch(dishAction.addCuisine(name))
    
    }
    const typeHandler = (index) => {
        setType(index)
    }
    const spicyHandler = (index) => {
        setSpicy(index)
    }
    const foodHandler=(index)=>{
        setFood(index)
    }

    
    const cuisineList= [

        {title:'Breakfast 🍳'},{title:"Appetizer 🍤"}, {title:"Maincourse 🍲"}, {title:'Thali/Meal 🍱'},{title:'Desert 🍨'}]
    const foodType=[{title:'🥗 Veg'},{title:'🍗 Non-Veg'}]
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}} >
            <ScrollView>
            <View style={{backgroundColor:'#ffffff'}}>
                <AddImage img={img} onPress = {onOpen}/>
            </View>

            <View style={{marginTop:10, backgroundColor:'white',}} >
                <Pressable onPress={onOpen2} style={{alignSelf:'center', width: Dimensions.get('screen').width*0.95, borderWidth:1, borderColor:'#08818a', padding:8, borderRadius:8}}>
                    <Text style={{fontFamily:'medium', alignSelf:'center',color:'#08818a', fontSize:18}}>Delivery Preference</Text>
                </Pressable>   

                <View style={{marginVertical:5, alignSelf:'center'}}>
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
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>typeHandler(index)} style={{backgroundColor:index===type?'#ec0c41':null, width:160, padding:6, borderRadius:8, margin:6, }}>
                    
                     
                        <Text style={{ fontFamily:'medium', fontSize:18, color:index === type?"white":'black', alignSelf:'center'}}>{item.title}</Text>
                        
                   
                    </TouchableOpacity>

                }}
            />
            
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={spicyList}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>spicyHandler(index)} style={{backgroundColor:index===spicy?'#ec0c41':null, width:160, padding:6, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:index===spicy?'white':"black", alignSelf:'center',}}>{item.title}</Text>
                    </TouchableOpacity>
                }}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={foodType}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>foodHandler(index)} style={{backgroundColor:index===food?'#ec0c41':null, width:160, padding:6, borderRadius:8, margin:6, }}>
                        <Text style={{ fontFamily:'medium', fontSize:18, color:index === food?"white":'black', alignSelf:'center'}}>{item.title}</Text>
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
                    label="Total number of quantity tobe available today"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
            </View>

            <View style={{width:'100%', marginVertical:16}}>
                <Pressable onPress={uploadDish} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>{types=='Edit'?'Edit Dish':'Add Dish'}</Text>
                </Pressable>
            </View>

           
            </View>
            </ScrollView>
            <Modalize  ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
            <Modalize  ref={modalizeRef2}>
                <View>
                    <TimeOrder/>
                </View>
            </Modalize>
        </SafeAreaView>
    )
};

export default DishUploadScreen;