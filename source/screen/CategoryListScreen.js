import React,{useEffect, useState} from 'react'
import {View,Text,Image,FlatList, Dimensions,TouchableOpacity} from 'react-native'
import { FAB, SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryActions from '../../store/action/category';
import { SafeAreaView } from 'react-native-safe-area-context'

const CategoryListScreen=props=>{
    const[search,setSearch]=useState()

    const dispatch=useDispatch();
    
    const cat = useSelector(state=>state.catergory.category)

    useEffect(()=>{
        loadCat();
    },[dispatch])
    
    const loadCat = async() => {
        await dispatch(categoryActions.fetchCategory())
    }

    
    
    
    // const renderCategory=itemData=>{
    //     return(
    //         <View style={{margin:5}}>
    //         <Text>{itemData.item.name}</Text>
    //         </View>
    //     )
    // }
    return(
        <SafeAreaView style={{flex:1}} >
        <SearchBar
            placeholder='Search Category'
            onChangeText={setSearch}
            value={search}
            lightTheme
        />
        <View style={{flex:1}}>
            <FlatList
                data={cat}
                renderItem={({item}) =>{
                    return(
                        <TouchableOpacity>
                    <View style={{width:Dimensions.get('window').width*0.94,alignSelf:'center', marginVertical:10}}>
                    <View style={{width:Dimensions.get('window').width*0.94, height:Dimensions.get('window').width*0.94/2, borderRadius:8, marginVertical:8, alignSelf:'center'}}>
                        <Image
                            style={{width:'100%', height:'100%', borderRadius:8}}
                            source={{uri:item.imguri}}
                        />
                    </View>
                    <Text style={{fontFamily:'medium', fontSize:20}} numberOfLines={1}>{item.name}</Text>
                    <Text style={{fontFamily:'book', fontSize:16}} numberOfLines={2} >{item.description}</Text>
                    </View>
                    </TouchableOpacity>)
                }}
                keyExtractor={x=>x.toString()}
            />
        </View>
        <FAB title='Add Category'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>{props.navigation.navigate('MenuCreation')}}
        />
        </SafeAreaView>
    )
}

export default CategoryListScreen