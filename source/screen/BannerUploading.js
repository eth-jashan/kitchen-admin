import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import {View,Text,Dimensions,FlatList,Image,ImageBackground,ActivityIndicator} from 'react-native'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-default';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize'
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { addBanner } from '../../store/action/banner';
import { fetchCategory } from '../../store/action/category';
import { fetchDish } from '../../store/action/dish';

import AddImage from '../component/addImage';

import ImageTaker from '../component/ImageTaker';
const BannerUploading=props=>{
    const dishlist=useSelector(x=>x.dish.dish);
    const categorylist=useSelector(x=>x.catergory.category)
    const[image,setImage]=useState()
    const[dishid,setDishid]=useState([])
    const[catid,setCatid]=useState([])
    const[load,setLoad]=useState(false)
    const[heading,setHeading]=useState()
    const[type,setType]=useState(0)
    const[textid,setTextid]=useState(0)
    const[description,setDescription]=useState()
    const modalizeRef = useRef(null);
    const modalizeRef2 = useRef(null);
    const modalizeRef3 = useRef(null);
    const[loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const onOpen = async() => {
        modalizeRef.current?.open();
    };
    const onOpen2=(index)=>{
        setType(index)
        modalizeRef2.current?.open();
    }
    const onOpen3=()=>{
        modalizeRef3.current?.open();
    }
    const imagetaken=(url)=>{
        setImage(url)
        modalizeRef.current?.close();
    }
    const addbaner=async()=>{
        try{
            setLoading(true)
        await dispatch(addBanner(heading,description,image,dishid,catid,textid))
        setLoading(false)
        }
        catch(err){
            console.log(err.message)
        }
    }
    
    
    const renderDish=({item})=>{
        return(
            <TouchableOpacity onPress={()=>{
                type==0?setDishid(prevState=>{return[...prevState,item.id]}):setCatid(prevState=>{return[...prevState,item.id]})
            }} style={{flexDirection:'row',borderWidth:1,borderColor:type==0?dishid.includes(item.id)?'#08818a':'white':catid.includes(item.id)?'#08818a':'white'}} >
            <View style={{width:100,height:70,margin:10}} >
            <Image source={{uri:item.imguri}} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{marginRight:10}}>
            <Text style={{fontSize:16, fontFamily:'medium',margin:4}} >{item.name}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    useEffect(()=>{
        const fetch=async()=>{
            setLoad(true)
            await dispatch(fetchDish())
            await dispatch(fetchCategory())
            setLoad(false)
        }
        fetch();
    },[dispatch])
    const typeList=[{title:'Dish'},{title:'Dish Category'},{title:'Others'},]
    const alignList=[{title:'top-left',main:'flex-start',submain:'left'},{title:'top-center',main:'flex-start',submain:'center'},{title:'top-right',main:'flex-start',submain:'right'}
    ,{title:'center-left',main:'center',submain:'left'},{title:'center-center',main:'center',submain:'center'},{title:'center-right',main:'center',submain:'right'},
    {title:'bottom-left',main:'flex-end',submain:'left'},{title:'bottom-center',main:'flex-end',submain:'center'},{title:'bottom-right',main:'flex-end',submain:'right'}]
    return(
        <ScrollView style={{flex:1}} >
            <View style={{marginTop:20}}>
            {!image?<AddImage img={image} onPress={onOpen} />:
            <ImageBackground source={{uri:image}} style={{width:Dimensions.get('screen').width*0.94,height:Dimensions.get('screen').width*0.52,justifyContent:alignList[textid].main, overflow:'hidden',alignSelf:'center', borderRadius:8, marginVertical:8}}>
        <View style={{padding:10}}>
            <Text style={{fontFamily:'medium', fontSize:24, color:'white',textAlign:alignList[textid].submain}}>{heading}</Text>
            <Text style={{fontFamily:'book', fontSize:18, color:'white',textAlign:alignList[textid].submain}}>{description}</Text>
        </View>
            
        </ImageBackground>}
            </View>
            <View style={{margin:10}} >
                <TextInput
                value={heading}
                onChangeText={setHeading}
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium',margin:10, fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                label='Banner Heading'
                mode='flat'
                />
                <TextInput
                value={description}
                multiline
                onChangeText={setDescription}
                theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                style={{ fontFamily: 'medium',margin:10, fontColor: '#08818a', width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                label='Banner Description'
                mode='flat'
                />
            </View>

            <View style={{margin:5}} >
            <Text style={{margin:5,fontFamily:'medium',fontSize:17,color:'black'}} >Banner Related to</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={typeList}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>{if(index==3){setType(index)}else{onOpen2(index)}}} style={{backgroundColor:'#08818a', width:160, padding:6, borderRadius:8, margin:6,height:40 }}>
                        <Text style={{ fontFamily:'medium', fontSize:18, color:"white", alignSelf:'center'}}>{item.title}</Text>
                    </TouchableOpacity>

                }}
            />
            </View>
            {dishid.length!=0 || catid.length!=0?<View style={{margin:5}} >
            <TouchableOpacity onPress={onOpen3} style={{backgroundColor:'#08818a',width:250, padding:6, borderRadius:8, margin:6,height:40 }}>
                        <Text style={{ fontFamily:'medium', fontSize:18, color:"white", alignSelf:'center'}}>Selected Categories</Text>
                    </TouchableOpacity>
            </View>:null}
            <View style={{margin:5}} >
            <Text style={{margin:5,fontFamily:'medium',fontSize:17,color:'black'}} >Banner Text Alignment</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={alignList}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index}) => {
                    return<TouchableOpacity onPress={()=>{setTextid(index)}} style={{backgroundColor:'#08818a', width:160, padding:6, borderRadius:8, margin:6,height:40 }}>
                        <Text style={{ fontFamily:'medium', fontSize:18, color:"white", alignSelf:'center'}}>{item.title}</Text>
                    </TouchableOpacity>

                }}
            />
            </View>
            <TouchableOpacity onPress={addbaner} style={{ backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center',marginBottom:30}} >
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}} >Add Banner</Text>
            </TouchableOpacity>
            <Modalize ref={modalizeRef} >
                <View>
                <ImageTaker onImageTaken={imagetaken} />
                </View>
            </Modalize>
            <Modalize ref={modalizeRef2} >
                <View>
                <View >
                <Text style={{color:'black',fontFamily:'medium',fontSize:17,margin:10}} >Select The {type==0?'Chef':type==1?'Dish':type==2?'Dish Category':null}</Text>
                <SearchBar
                lightTheme
                  placeholder={type==0?'Search Dish':'Search Dish Category'}
                />
                </View>
                <View>
                <FlatList
                    data={type==0?dishlist:type==1?categorylist:null}
                    renderItem={renderDish}
                    keyExtractor={x=>x.id}
                />
                </View>
                </View>
            </Modalize>
            <Modalize ref={modalizeRef3} >
                <View style={{height:dishid.length!=0?Dimensions.get('screen').height*0.4:null}} >
                <Text style={{fontFamily:'medium',fontSize:18,color:'black',margin:10}} >Selected Dishes</Text>
                {dishid.length!=0?<FlatList
                    data={dishid}
                    renderItem={({item})=>{
                        console.log(dishlist.some(x=>x.id==item),item)
                        return(
                            <View style={{flexDirection:'row'}} >
            <View style={{width:100,height:70,margin:10}} >
            <Image source={{uri:dishlist[dishlist.findIndex(x=>x.id==item)].imguri}} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{marginRight:10}}>
            <Text style={{fontSize:16, fontFamily:'medium',margin:4}} >{dishlist[dishlist.findIndex(x=>x.id==item)].name}</Text>
           
            </View>
            </View>
                        )
                    }}
                /> :<Text style={{fontFamily:'medium',textAlign:'center',fontSize:18,color:'black',margin:10}} >No Dishes Selected yet </Text>}
            </View>
                <View style={{height:catid.length!=0?Dimensions.get('screen').height*0.4:null}} >
                <Text style={{fontFamily:'medium',fontSize:18,color:'black',margin:10}} >Selected Dish Categories</Text>
                {catid.length!=0?<FlatList
                    data={catid}
                    renderItem={({item})=>{
                        console.log(categorylist.some(x=>x.id==item),item)
                        return(
                            <View style={{flexDirection:'row'}} >
            <View style={{width:100,height:70,margin:10}} >
            <Image source={{uri:categorylist[categorylist.findIndex(x=>x.id==item)].imguri}} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{marginRight:10}}>
            <Text style={{fontSize:16, fontFamily:'medium',margin:4}} >{categorylist[categorylist.findIndex(x=>x.id==item)].name}</Text>
            
            </View>
            </View>
                        )
                    }}
                /> :<Text style={{fontFamily:'medium',textAlign:'center',fontSize:18,color:'black',margin:10}} >No Dish Categories Selected yet </Text>}
                </View>
            </Modalize>
        </ScrollView>
    )
}

export default BannerUploading