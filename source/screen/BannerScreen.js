import React, { useEffect,useState } from 'react'
import { Dimensions } from 'react-native';
import {View,Text,Image,FlatList,ImageBackground } from 'react-native'
import { FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '../../store/action/banner';


const BannerScreen=props=>{
    const Banner=useSelector(x=>x.banner.banner)
    const[loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetch=async()=>{
            setLoading(true)
            await dispatch(fetchBanner())
            setLoading(false)
        }
        fetch()
    },[dispatch])
    if(loading){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
        <View style={{width:150,height:120}} >
            <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
        </View>
    </View>)
    }
    if(Banner.length==0){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'white'}} >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../assets/noorders.png')} style={{width:300,height:210}} />
                <Text style={{fontFamily:'bold',fontSize:20,color:'#08818a',margin:5}} >No Banners Created Yet</Text>
            </View>
            <FAB
            title='Add Banner'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>props.navigation.navigate('BannerUpload')}
            />
            </SafeAreaView>
        )
    }
    const alignList=[{title:'top-left',main:'flex-start',submain:'left'},{title:'top-center',main:'flex-start',submain:'center'},{title:'top-right',main:'flex-start',submain:'right'}
    ,{title:'center-left',main:'center',submain:'left'},{title:'center-center',main:'center',submain:'center'},{title:'center-right',main:'center',submain:'right'},
    {title:'bottom-left',main:'flex-end',submain:'left'},{title:'bottom-center',main:'flex-end',submain:'center'},{title:'bottom-right',main:'flex-end',submain:'right'}]
    console.log(Banner)
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}} >
        <FlatList
            data={Banner}
            keyExtractor={x=>x.id}
            renderItem={({item})=>{
                return(
                    <ImageBackground source={{uri:item.imguri}} style={{width:Dimensions.get('screen').width*0.94,height:Dimensions.get('screen').width*0.52,justifyContent:item.textid?alignList[item.textid].main:null, overflow:'hidden',alignSelf:'center', borderRadius:8, marginVertical:8}}>
                {item.name || item.description?<View style={{padding:10}}>
                   <Text style={{fontFamily:'medium', fontSize:20, color:'white',textAlign:alignList[item.textid].submain}}>{item.name}</Text>
                   <Text style={{fontFamily:'book', fontSize:18, color:'white',textAlign:alignList[item.textid].submain}}>{item.description}</Text>
                  </View>:null}
                 </ImageBackground>
                )
            }}
        />
        
        <FAB
        title='Add Banner'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>props.navigation.navigate('BannerUpload')}
        />
        </SafeAreaView>
    )
}

export default BannerScreen;