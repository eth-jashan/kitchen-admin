import React,{useEffect, useState} from 'react'
import {View,Text,Image,FlatList, Dimensions} from 'react-native'
import { FAB, SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryActions from '../../store/action/category';
import { SafeAreaView } from 'react-native-safe-area-context'

const CategoryListScreen=props=>{
    const cat=useSelector(x=>x.catergory.category)
    //console.log(dish);
    const[search,setSearch]=useState()
    const dispatch=useDispatch();
    const renderCategory=itemData=>{
        return(
            <View style={{margin:5}}>
            <Text>{itemData.item.name}</Text>
            </View>
        )
    }
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(categoryActions.fetchCategory())
        }
        fetch()
    })
    return(
        <SafeAreaView style={{flex:1}} >
        <SearchBar
            placeholder='Search Category'
            onChangeText={setSearch}
            value={search}
        />
        <View>
            <FlatList
                data={cat}
                renderItem={renderCategory}
                keyExtractor={x=>x.id}
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