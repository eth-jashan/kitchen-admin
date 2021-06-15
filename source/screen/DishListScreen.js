import React,{useEffect, useState} from 'react'
import {View,Text,Image,FlatList, Dimensions} from 'react-native'
import { FAB, SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDish } from '../../store/action/dish'
import { SafeAreaView } from 'react-native-safe-area-context'

const ListScreen=(props)=>{
    const dish=useSelector(x=>x.dish.dish)
    const[search,setSearch]=useState()
    const dispatch=useDispatch
    const renderDish=itemData=>{
        return(
            <View style={{margin:5}}>
            <Text>{itemData.item.name}</Text>
            </View>
        )
    }
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchDish())
        }
        fetch()
    })
    return(
        <SafeAreaView style={{flex:1}} >
            <SearchBar
        placeholder='Search Dish'
        onChangeText={setSearch}
        value={search}
        />
        <View>
            <FlatList
                data={dish}
                renderItem={renderDish}
                keyExtractor={x=>x.id}
            />
        </View>
        <FAB title='Add Dish'
            placement='right'
            color='#08818a'
            size='small'
        />
        </SafeAreaView>
    )
}

export default ListScreen