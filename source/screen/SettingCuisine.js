import React,{useRef, useState, useEffect} from 'react'
import { Image, ScrollView, StyleSheet, View, Text, Dimensions, Pressable, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
const{width, height} = Dimensions.get('window')
import * as profileAction from '../../store/action/profile'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Modalize } from 'react-native-modalize';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'

//api
import GoogleLocationApi from '../api/GoogleLocationApi';

//action
import * as profileActions from '../../store/action/profile';


const SettingCuisine = () => {



const modalizeRef = useRef(null);
const cuisine = useSelector(x=>x.profile.cuisine)
const dispatch = useDispatch()

const [location, setLocation] = useState(null);
const[city,setCity] = useState(null);
const[postal,setPostal] = useState(null);
const[landmark,setLandMark] = useState(null);
const[address,setAddress] = useState();
const[userAddress,setUserAddress] = useState(null);

const[name,setName] = useState(null);
const[mail,setMail] = useState(null);
const[phone,setPhone] = useState(null);


const [errorMsg, setErrorMsg] = useState(null);
const [room, setRoom] = useState('');

const onSubmit = async() => {
   await dispatch(profileAction.createAccount(name,mail,phone,cuisine,type,address,userAddress))
}

const readData = async () => {
    try {
      const data = await AsyncStorage.getItem('personalInfo')
      console.log(data);
     
  
      if (data !== null){
        const userData = JSON.parse(data);
        setName(userData.name);setMail(userData.mail);setPhone(userData.phone);
        
      } 
    } catch (e) {
      console.log('error:'+e);
    }
  }

const revereGeoCodeResponse = async(latitude,longitude) =>{
    try{
        const response = await GoogleLocationApi.get(`geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`)
       // console.log(response.data);
        const address =  response.data.results[0].formatted_address;
       // setLoc(JSON.stringify( response.data.results[0].geometry.location))
        const loc = JSON.stringify(response.data.results[0].address_components) ;
        
        const array = response.data.results[0].address_components;
        const length = array.length;
        const city = response.data.results[0].address_components[length-4].long_name
        const postal = response.data.results[0].address_components[length-1].long_name
        
        setAddress(address);setUserAddress(address);
        setCity(city);
        setPostal(postal);
        
        console.log('*************************',address);
        console.log('*******city******************',loc);
    }
    catch(e){
        console.log('error!', e)
    }
}

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
      readData()
  },[])


const onOpen = async() => {
    modalizeRef.current?.open();
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    //console.log(location.coords.latitude, location.coords.longitude)
    await revereGeoCodeResponse(location.coords.latitude, location.coords.longitude)
   
};
const [typeIndex, setTypeIndex] = useState(0)



  const cuisineHandler = (name) => {

    dispatch(profileAction.addCuisine(name))

}

const type = ['Pre-Order', 'On-Demand', 'Both']
const cuisineList= [

    {title:'Chinese', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fchinese-C.jpg?alt=media&token=31600780-81bb-42ac-ad56-34a8dad6e3eb'}, {title:'Mughalai', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmughlai%20C.png?alt=media&token=34f965d1-a887-4bee-8d9c-3de783715883'}, {title:"Indian", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Findian%20C.jpg?alt=media&token=a43b190c-6537-47a9-88d2-941141d3bfbf"}, {title:"Seafood", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSeafood%20c.jpg?alt=media&token=303fd2c3-960e-42f2-84c1-e26010278947"}, {title:'Maharashtrian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmaharashtrain%20C.png?alt=media&token=24920057-ce78-457d-8908-b7da35ba260b'},
    {title:'South Indian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSouth%20Indian%20Cuisine.jpg?alt=media&token=781238cd-09a0-4b31-86a1-c1f9e6876766'}, {title:'Italian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fitalian%20cuisine.jpg?alt=media&token=531be0cc-043e-40af-a5a0-9246bbda7174'}, {title:'Bengali', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fbengali%20C.jpg?alt=media&token=03126d7c-022a-42df-9bf7-b22a703b9ab9'}, {title:"Mexican", link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmexican%20C.jpg?alt=media&token=58253377-b5fa-4c6a-b927-6b5ff596a0e6'}, {title:'Thai', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fthai%20C.jpg?alt=media&token=342d552e-3d6f-4ad3-9923-83310d8c82d2'},
    {title:'American', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FAmerican-Traditional%20C.jpg?alt=media&token=32561b97-384b-4bf1-8c8c-c23c590441bb'}, {title:'Arabian',link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FArabian%20C.jpg?alt=media&token=772555aa-b28e-4d61-92ee-63ca9f42e1ba'}, {title:'BBQ', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FBBQ%20c.jpg?alt=media&token=9e8c62ef-c3e5-4fd2-a409-d24d10717194'}, {title:'British', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fbritish%20Cu.jpg?alt=media&token=554e452a-3f5c-4f36-955b-c9c18aa4d9ca'}, {title:'Chettinad', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FChettinad-cuisine.jpg?alt=media&token=91c98b14-da73-4407-919c-23f325e68a50'},
    {title:'French', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Ffrench%20C.jpg?alt=media&token=2eb8eca5-d5ed-4cc8-9ca3-46ebfe01cce5'}, {title:'European', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Feuropean%20C.jpeg?alt=media&token=686cdafe-6424-4324-abe7-95a5118eb4b6'}, {title:'Japanese', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fjapanese%20CU.jpg?alt=media&token=484d0869-089e-4a99-ab55-8ddc4ebf4322'} 
]

    return(
        <SafeAreaView>
        <ScrollView>
            <Image
                style={StyleSheet.absoluteFillObject}
                source={require('../../android/app/src/main/assets/image/vector-yellow-abstract-background.jpg')}
            />
            <View style={{width:'100%', padding:10, justifyContent:'space-between'}}>
            <Ionicons onPress={()=>navigation.navigate('Welcome')} name="arrow-back" size={30} color="white" />
            </View>
            <View style={{width:'100%', padding:10}}>
                <Text style={{fontFamily:'black', color:'white', fontSize:30}}>33% <Text style={{fontFamily:'light', fontSize:20}}>completed</Text></Text>
                <Text style={{fontFamily:'black', color:'white', fontSize:24, marginVertical:8}}>Cuisine Details</Text>
                <View style={{borderWidth:2, borderColor:'white', borderRadius:20, width:'30%', backgroundColor:'white'}}/>
            </View>
            <View style={{height:height*1.1,backgroundColor:'white', top:height*0.1, borderTopLeftRadius:20, borderTopRightRadius:20, padding:10}}>
            
            <View style={{marginTop:30, marginHorizontal:10}}>
                <Text style={{fontFamily:'medium', fontSize:30, color:'black'}}>Signup as Chef</Text>
                <Text style={{fontFamily:'book', fontSize:18, marginTop:4}}>Setting up cuisine preference</Text>
            </View>
            
            <Text style={{fontFamily:'medium', fontSize:18, marginTop:20, color:'black'}}>Cuisine Selected ({`${cuisine.length}/${cuisineList.length}`})</Text>
            <View style={{marginVertical:8}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={cuisine}
                keyExtractor={(_,i) => i.toString()}
                renderItem={({item})=>{
                    return<Pressable style={{padding:8, borderRadius:4, backgroundColor:'#08818a', width:120, marginHorizontal:8, height:30}}>
                        <Text style={{fontFamily:'book', color:'white',alignSelf:'center'}}>{item}</Text>
                    </Pressable>
                }}
            />
            </View>
            
            <View>
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

            <Text style={{fontFamily:'medium', fontSize:18, marginTop:14, color:'black'}}>Delivery Preference</Text>
            <FlatList
                style={{alignSelf:'center', marginVertical:16}}
                horizontal
                data={type}
                keyExtractor={x=>x}
                renderItem={({item, index}) =>{
                    return<Pressable onPress={()=>setTypeIndex(index)} style={{ backgroundColor:typeIndex===index?'#08818a':'white', padding:1, borderRadius:4, width:100, alignSelf:'center', justifyContent:'center', borderColor:typeIndex === index?null:'#08818a', height:50, }}>
                        <Text style={{fontFamily:'light', fontSize:18, alignSelf:'center', color:typeIndex===index?'white':'#08818a'}}>{item}</Text>
                        </Pressable>
                }}
            />
            
            
            
            <Text style={{fontFamily:'medium', fontSize:18, marginTop:14, color:'black'}}>Store/Kitchen Location</Text>
            
            <Pressable onPress={onOpen} style={{marginVertical:12, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Auto Location Fill📍</Text>
            </Pressable>
            <Pressable onPress={onSubmit} style={{marginVertical:12, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'70%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Submit</Text>
            </Pressable>
            

            
            </View>
            {/* <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}}>
            <View/>
                <Pressable onPress={()=>console.log('loca', current)} style={{backgroundColor:'#08818a', padding:8, borderRadius:8, width:60, alignSelf:'center', justifyContent:'center', height:60}}>
                <AntDesign  name="arrowright" size={30} color="white" style={{alignSelf:'center', justifyContent:'center'}}/>
                </Pressable>
            </View> */}
            
            
            
            
            
            </View>


            <Modalize ref={modalizeRef}>
            <ScrollView>
            {location?<View style={{width:width, height:height/3}}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{width:'100%', height:'100%'}}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0121,
                    }}>
        
        <Marker
          
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
        />        
        </MapView>
        </View>:null}

            <View style={{marginVertical:8}}>
            <TextInput
                type="flat"
                value={userAddress}
                label = 'House/Flat/Block No.'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>

            <View style={{marginVertical:8}}>
            <TextInput
                type="flat"
                value={landmark}
                label = 'Landmark'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
            />
            </View>

            <View style={{marginVertical:8, width:width, flexDirection:'row', alignSelf:'center', padding:8, justifyContent:'space-between'}}>
            <View>
            <TextInput
                type="flat"
                value={postal}
                label = 'Pincode'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: width*0.45, alignSelf:'center' }}
            />
            </View>

            <View>
            <TextInput
                type="flat"
                value={city}
                label = 'City'
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width: width*0.45, alignSelf:'center' }}
            />
            </View>
            </View>

            <Pressable onPress={onOpen} style={{marginVertical:12, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Add Address</Text>
            </Pressable>
            
            </ScrollView>
            </Modalize>
            </ScrollView>   
        </SafeAreaView>
    )

}



export default SettingCuisine