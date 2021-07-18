import React,{useState,useRef,useEffect} from 'react';
import { View,Text,ScrollView,Pressable, Dimensions,Image, TouchableOpacity,ToastAndroid,Platform,AlertIOS } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddImage from '../component/addImage';
import * as Location from 'expo-location';
import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';
import { addcategory, editCategory } from '../../store/action/category';
import { useDispatch } from 'react-redux';
import { imageCheck } from '../../store/action/dish';
import ModalPopup from '../component/ModalPopup';

const CategoryUpload = (props) => {
    const modalizeRef = useRef(null);

    const{type,catImguri,catName,catDescription,catId} =  props.route.params;
    // console.log(imguri,catName,catDescription);

    const[name,setName]=useState()
    const[description,setDescription]=useState()
    const[img,setImg]=useState()
    const [location, setLocation] = useState(null);
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const[loading,setloading]=useState(false)
    const[visible,setVisible]=useState(false)
    const[foundLocation,setFoundLocation] = useState(false)
    const dispatch=useDispatch()
    const startMap = async() => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude) 
        setFoundLocation(true)
    }
    const imagetaken=(url)=>{
        setImg(url)
        modalizeRef.current?.close()
    }
    const onOpen = async() => {
        modalizeRef.current?.open();
    
    };
    const addCategory=async()=>{
        if(type === 'Edit'){
            setloading(true)
            await dispatch(editCategory(catId,name,description,img,latitude,longitude))
            setloading(false)
            setVisible(true)
        }
        else{
            setloading(true)
            await dispatch(addcategory(name,description,img,latitude,longitude))
            setloading(false)
            setVisible(true)
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
        startMap();
        if(type === 'Edit'){
            setName(catName);
            setDescription(catDescription);
            setImg(catImguri);
            console.log(img);
        }
    
    },[foundLocation])


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
                    label="Name"
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />

                </View>
                <View style={{marginVertical:10, alignSelf:'center'}} >
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    mode='flat'
                    label="Description"
                    multiline={true}
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />

                </View>
            <View style={{width:'100%'}} >
                <TouchableOpacity onPress={addCategory}  style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center',marginVertical:15}}>
                   {loading?<ActivityIndicator size='small' color='white' />: <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center', color:'white'}}>{type=='Create'?'Add Category':'Edit Category'}</Text>}
                </TouchableOpacity>
                </View>
                </View>

                
            </ScrollView>
            <Modalize ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
            <ModalPopup type='Cat' navigation={props.navigation} visible={visible} />

        </SafeAreaView>
        
    )
};

export default CategoryUpload;