import React, { useEffect ,useRef, useState} from 'react'
import {View,Text,Image,Dimensions,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { addCuisine, addRecommeded, addUserCuisine, addUserRecommeded, fetchSpecificChef, updateChef } from '../../store/action/profile'
import { Modalize } from 'react-native-modalize';
import ImageTaker from '../component/ImageTaker';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchDish } from '../../store/action/dish';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

const ProfileScreen=props=>{
    const cuisines=useSelector(x=>x.profile.cuisine)
    const recommed=useSelector(x=>x.profile.recommeded)
    const chef=useSelector(x=>x.profile.chef)
    const dish=useSelector(x=>x.dish.dish)
    const dispatch=useDispatch()
    const[profile,setProfile]=useState(chef[0].imguri?chef[0].imguri:null)
    const[Backimg,setBackimg]=useState(chef[0].bguri?chef[0].bguri:null)
    const[loading,setLoading]=useState(false)
    const[load,setLoad]=useState(false)
    const[name,setname]=useState(chef[0].name)
    const[editable,setEditable]=useState(false)
    const modalizeRef = useRef(null);
    const modalizeRef2 = useRef(null);
    const onOpen = async() => {
        modalizeRef.current?.open();
    };
    const onOpen2 = async() => {
        modalizeRef2.current?.open();
    };
    const onprofiletaken=(uri)=>{
        setProfile(uri)
        modalizeRef.current?.close();
    }

    const onBackimgtaken=(uri)=>{
        setBackimg(uri)
        modalizeRef2.current?.open();
    }

    const cuisineList= [

        {title:'Chinese', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fchinese-C.jpg?alt=media&token=31600780-81bb-42ac-ad56-34a8dad6e3eb'}, {title:'Mughalai', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmughlai%20C.png?alt=media&token=34f965d1-a887-4bee-8d9c-3de783715883'}, {title:"Indian", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Findian%20C.jpg?alt=media&token=a43b190c-6537-47a9-88d2-941141d3bfbf"}, {title:"Seafood", link:"https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSeafood%20c.jpg?alt=media&token=303fd2c3-960e-42f2-84c1-e26010278947"}, {title:'Maharashtrian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmaharashtrain%20C.png?alt=media&token=24920057-ce78-457d-8908-b7da35ba260b'},
        {title:'South Indian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FSouth%20Indian%20Cuisine.jpg?alt=media&token=781238cd-09a0-4b31-86a1-c1f9e6876766'}, {title:'Italian', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fitalian%20cuisine.jpg?alt=media&token=531be0cc-043e-40af-a5a0-9246bbda7174'}, {title:'Bengali', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fbengali%20C.jpg?alt=media&token=03126d7c-022a-42df-9bf7-b22a703b9ab9'}, {title:"Mexican", link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fmexican%20C.jpg?alt=media&token=58253377-b5fa-4c6a-b927-6b5ff596a0e6'}, {title:'Thai', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fthai%20C.jpg?alt=media&token=342d552e-3d6f-4ad3-9923-83310d8c82d2'},
        {title:'American', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FAmerican-Traditional%20C.jpg?alt=media&token=32561b97-384b-4bf1-8c8c-c23c590441bb'}, {title:'Arabian',link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FArabian%20C.jpg?alt=media&token=772555aa-b28e-4d61-92ee-63ca9f42e1ba'}, {title:'BBQ', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FBBQ%20c.jpg?alt=media&token=9e8c62ef-c3e5-4fd2-a409-d24d10717194'}, {title:'British', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fbritish%20Cu.jpg?alt=media&token=554e452a-3f5c-4f36-955b-c9c18aa4d9ca'}, {title:'Chettinad', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2FChettinad-cuisine.jpg?alt=media&token=91c98b14-da73-4407-919c-23f325e68a50'},
        {title:'French', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Ffrench%20C.jpg?alt=media&token=2eb8eca5-d5ed-4cc8-9ca3-46ebfe01cce5'}, {title:'European', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Feuropean%20C.jpeg?alt=media&token=686cdafe-6424-4324-abe7-95a5118eb4b6'}, {title:'Japanese', link:'https://firebasestorage.googleapis.com/v0/b/merchant-admin.appspot.com/o/cuisineImages%2Fjapanese%20CU.jpg?alt=media&token=484d0869-089e-4a99-ab55-8ddc4ebf4322'} 
    ]
    var cuisine=[]
    var recommeded=[]
    if(chef.length!=0){
        for(const k in cuisineList){
            for(const id in chef[0].cuisine){
                if(chef[0].cuisine[id]==cuisineList[k].title){
                    cuisine.push(cuisineList[k])
                }
            }
        }
        for(const k in dish){
            for(const id in chef[0].recommeded){
                if(chef[0].recommeded[id]==dish[k].id){
                    recommeded.push(dish[k])
                }
            }
        }

    }

    const onSubmit=async()=>{
        setLoad(true)
        await dispatch(updateChef(chef[0].id,name,profile,Backimg,cuisines,recommed))
        setLoad(false)
        setEditable(false)
    }

    const cuisineHandler = (name) => {
        dispatch(addCuisine(name))
    }
    const recommededHandler=(id)=>{
        dispatch(addRecommeded(id))
    }
    const addData=async()=>{
        await dispatch(addUserCuisine(chef[0].cuisine))
        if(chef[0].recommeded){
            await dispatch(addUserRecommeded(chef[0].recommeded))
        }
        
    }
    useEffect(()=>{
        const fetch=async()=>{
            setLoading(true)
            await dispatch(fetchSpecificChef())
            setLoading(false)
            await dispatch(fetchDish())
        }
        fetch()
        if(chef){
            addData()
        }
    },[dispatch])

    if(loading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
            <View style={{width:150,height:120}} >
                <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
            </View>
        </View>
        )
    }
    return(
        <SafeAreaView>
        {load?<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',position:'absolute',backgroundColor: 'rgba(0,0,0,0.5)'}} >
            <ActivityIndicator color='#08818a' size='large' />
        </View>:null}
        <ScrollView >
        <View style={{width:'100%', height:Dimensions.get('window').height*0.25,opacity:2}}>

        <TouchableOpacity onPress={editable?onOpen2:null} >
        <Image
            source={{uri:Backimg?Backimg:'https://wallpaperaccess.com/full/767033.jpg'}}
            style={{width:'100%', height:'100%'}}
        />
        </TouchableOpacity>
        
    </View>

    <TouchableOpacity onPress={editable?onOpen:null} >
    <Image
        height={Dimensions.get('screen').width*0.3}
        width={Dimensions.get('screen').width*0.3}
        style={{borderRadius:Dimensions.get('screen').width*0.3, width:Dimensions.get('screen').width*0.3, height:Dimensions.get('screen').width*0.3, bottom:Dimensions.get('screen').width*0.15, borderColor:'white', borderWidth:2, alignSelf:'center'}}
        source={{uri:profile?profile:'https://static.vecteezy.com/system/resources/previews/000/364/628/original/vector-chef-avatar-illustration.jpg'}}
    />
    </TouchableOpacity>
    {editable?<TextInput
    value={name}
    mode='flat'
    label='Name'
    onChangeText={setname}
    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
    style={{fontFamily:'medium',width:'60%', color:'black',fontSize:18,backgroundColor:'transparent', alignSelf:'center',bottom:Dimensions.get('window').width*0.1}}
    />:    <Text style={{fontFamily:'medium', color:'black',fontSize:18, textAlign:'center',bottom:Dimensions.get('window').width*0.1}}>{name}</Text>
}

    <TouchableOpacity onPress={()=>{!editable?setEditable(true):Alert.alert('Update Changes','Are you sure you want to update the changes',[{text:'Yes',onPress:onSubmit},{text:'No',onPress:()=>setEditable(false)}])}} 
    style={{borderColor:'#08818a',borderWidth:0.75, width:'80%', alignSelf:'center', padding:10, borderRadius:8, flexDirection:'row', justifyContent:'center', bottom:Dimensions.get('window').width*0.075}}>
    <AntDesign name="edit" size={20} color="#08818a" />
    <Text style={{fontFamily:'book', fontSize:16, color:'#08818a', marginLeft:14}}>{editable?'Confirm Changes':'Edit Profile'}</Text>   
    </TouchableOpacity>
    <View style={{width:'90%', marginVertical:16, borderColor:'gray', borderWidth:0.5, alignSelf:'center'}}/>
            <Text style={{fontSize:18, color:'black', fontFamily:'medium', marginBottom:12, marginLeft:8}}>Famous Cuisines</Text>
            <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={editable?cuisineList:cuisine}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item}) => {
                    return<TouchableOpacity onPress={()=>{cuisineHandler(item.title)}}  >
                    <View style={{width:120, borderRadius:6, alignSelf:'center', height:100, marginLeft:6}}>
                        <Image
                            
                            style={{width:'100%', height:'100%',borderRadius:8,opacity:editable? !cuisines?0.2:cuisines.includes(item.title)?1:0.2:null}}
                            source={{uri:item.link}}
                        />
                        <View style={{position:'absolute', bottom:10, left:20}}>
                        <Text style={{ fontFamily:'medium', fontSize:14, color:"white"}}>{item.title}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                }}
            />
            </View>
            
            <Text style={{ fontSize:18, color:'black', fontFamily:'medium',  marginBottom:12, marginTop:16, marginLeft:8}}>Chef Location</Text>
            <View style={{width:'100%', padding:8, flexDirection:'row',justifyContent:'space-between',}}>
                <MapView
                    style={{height:54, width:54, borderRadius:10}}
                />
                <View style={{ width:'60%', alignSelf:'center'}}>
                    <Text style={{fontSize:14, fontFamily:'book'}}>{chef[0].address}</Text>
                </View>

                <Ionicons name="navigate-circle" size={40} color="#08818a" style={{alignSelf:'center'}} />
            </View>

            
            <View style={{width:'90%', marginVertical:16, borderColor:'gray', borderWidth:0.5, alignSelf:'center'}}/>
            <Text style={{ fontSize:18, color:'black', fontFamily:'medium', marginBottom:8, marginTop:16, marginLeft:8}}>Recommeded Dishes</Text>

            <View style={{marginBottom:20}} >
            {chef[0].recommeded?<FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={editable?dish.filter(x=>x.name && x.description):recommeded}
                keyExtractor={x=>x.id}
                renderItem={({item}) =>{
                    return<TouchableOpacity onPress={()=>recommededHandler(item.id)} style={{marginHorizontal:6, }}>
                        <Image
                            source={{uri:item.imguri}}
                            style={{width:170, height:170, borderRadius:8,opacity:editable?recommed.includes(item.id)?1:0.2:null}}

                        />
                        <View style={{width:170, backgroundColor:'white', borderRadius:8, padding:8}}>
                            <Text style={{fontFamily:'medium', fontSize:16}}>{item.name}</Text>
                            <Text numberOfLines={2} style={{fontFamily:'book', fontSize:14}}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                }}
            />:
            editable?<FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dish.filter(x=>x.name && x.description)}
                keyExtractor={x=>x.id}
                renderItem={({item}) =>{
                    return<TouchableOpacity onPress={()=>recommededHandler(item.id)} style={{marginHorizontal:6, }}>
                        <Image
                            source={{uri:item.imguri}}
                            style={{width:170, height:170, borderRadius:8,opacity:editable? !recommed?0.2:recommed.includes(item.id)?1:0.2:null}}

                        />
                        <View style={{width:170, backgroundColor:'white', borderRadius:8, padding:8}}>
                            <Text style={{fontFamily:'medium', fontSize:16}}>{item.name}</Text>
                            <Text numberOfLines={2} style={{fontFamily:'book', fontSize:14}}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                }}
            />
            :<View>
                <Text style={{fontFamily:'book',margin:20, color:'black',fontSize:14, textAlign:'center',bottom:Dimensions.get('window').width*0.05}} >No Recommeded Dishes Selected for Customer Yet</Text>
            </View>}
            </View>
           
            
            
        </ScrollView>
        <Modalize  ref={modalizeRef}>
                <View>
                    <ImageTaker onImageTaken={onprofiletaken} />
                </View>
        </Modalize>
        <Modalize  ref={modalizeRef2}>
                <View>
                    <ImageTaker onImageTaken={onBackimgtaken} />
                </View>
        </Modalize>
        </SafeAreaView>
    )
}

export default ProfileScreen
