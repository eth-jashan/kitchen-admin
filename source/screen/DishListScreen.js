import React,{useEffect, useState} from 'react'
import {View,Text,Image,FlatList, Dimensions,TouchableOpacity, ScrollView} from 'react-native'
import { FAB, SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import * as dishActions from '../../store/action/dish';
import { SafeAreaView } from 'react-native-safe-area-context'

const ListScreen=(props)=>{
    // const dish=useSelector(x=>x.dish.dish)
    //console.log(dish);
    const dish = ['1', '2', '3']
    const[search,setSearch]=useState()

    const dispatch=useDispatch()
    const renderDish=itemData=>{
        return(
            <View style={{margin:5}}>
            <Text>{itemData.item.name}</Text>
            </View>
        )
    }
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(dishActions.fetchDish())
        }
        fetch()
    })
    return(
        <SafeAreaView style={{flex:1}} >
            <SearchBar
            lightTheme
        placeholder='Search Dish'
        onChangeText={setSearch}
        value={search}
        />
        <View style={{flex:1}}>
            <FlatList
                data={dish}
                renderItem={({item}) =>{
                    return<View style={{width:Dimensions.get('window').width*0.94,alignSelf:'center', marginVertical:10}}>
                    <View style={{width:Dimensions.get('window').width*0.94, height:Dimensions.get('window').width*0.94/2, borderRadius:8, marginVertical:8, alignSelf:'center'}}>
                        <Image
                            style={{width:'100%', height:'100%', borderRadius:8}}
                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnCrhkGU2a7BV9o_PApRTZLsyri9qeXgs6A&usqp=CAU'}}
                        />
                    </View>
                    
                    <ScrollView horizontal style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>less spicy😌</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, marginVertical:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>Thali/Meal 🍱</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>serves1-2 👫</Text>
                    </TouchableOpacity>
                    </ScrollView>

                    <Text style={{fontFamily:'medium', fontSize:20}} numberOfLines={1}>Butter Chicken Meal</Text>
                    <Text style={{fontFamily:'book', fontSize:16}} numberOfLines={2} >Butter Chicken or murgh makhani is a curry of chicken in a spiced tomato, butter and cream sauce. It originated in India as a curry. It is similar to chicken tikka masala, which uses a tomato </Text>
                    <Text style={{fontFamily:'bold', fontSize:18}}>₹ 200</Text>
                    </View>
                }}
                keyExtractor={(x,i)=>i.toString()}
            />
        </View>
        <FAB title='Add Dish'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>{props.navigation.navigate('DishUpload')}}
        />
        </SafeAreaView>
    )
}

export default ListScreen