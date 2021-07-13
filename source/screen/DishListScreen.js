import React,{useEffect, useState} from 'react'
import {View,Text,Image,FlatList, Dimensions,TouchableOpacity, ScrollView} from 'react-native'
import { FAB, SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import * as dishActions from '../../store/action/dish';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ListScreen=(props)=>{
    const dish=useSelector(x=>x.dish.dish)
    const {catId} =  props.route.params
    const[search,setSearch]=useState()
    const[done,setDone] = useState(false);
    const[myDish,setMyDish] = useState([]);
    const[load,setLoad] = useState(true);


    console.log(catId);

    const dispatch=useDispatch()

    const filterList = () => {
        if(catId){
          let newDishes = dish.filter(x=>x.categoryId === catId)
            setMyDish(newDishes);
            setDone(true)
            
        }
        else{
            setMyDish(dish);
            setDone(false)
        }
    }
    
    useEffect(()=>{
        const fetch=async()=>{
            setLoad(true);
            await dispatch(dishActions.fetchDish())
            setLoad(false);
        }
        fetch()
        filterList()
    },[dispatch])
    const foodType=[{title:'Pure Veg'},{title:'Non-Veg'},{title:'Vegan'}]
    if(load){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
        <View style={{width:150,height:120}} >
            <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
        </View>
    </View>)
    }

    if(myDish.length==0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
            <View>
                <Image style={{width:100,height:100,alignSelf:'center'}} source={{uri:'https://cdn.dribbble.com/users/189859/screenshots/3639645/abc.gif' }} />
                <Text style={{alignSelf:'center',fontFamily:'bold',fontSize:20,color:'#08818a'}} >No Dishes Found</Text>
            </View>
            <Text style={{fontFamily:'book',fontSize:15,color:'black'}} >Chef Has Not Uploaded Any Dishes Yet</Text>
            <FAB title='Add Dish'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>{props.navigation.navigate('DishUpload',{types:'Create'})}}
            />
            </View>
        )

    }

    
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
                data={myDish}
                renderItem={(itemData) =>{
                    return<View style={{width:Dimensions.get('window').width*0.94,alignSelf:'center', marginVertical:10}}>
                    <View style={{width:Dimensions.get('window').width*0.94, height:Dimensions.get('window').width*0.94/2, borderRadius:8, marginVertical:8, alignSelf:'center'}}>
                    
                        <Image
                            style={{width:'100%', height:'100%', borderRadius:8}}
                            source={{uri:itemData.item.imguri}}
                        />
                        <View style={{alignSelf: 'flex-end',marginTop: 5,flexDirection:'row',position:'absolute'}} >
                            <TouchableOpacity onPress={()=>{props.navigation.navigate('DishUpload',{types:'Edit',data:itemData.item})}} style={{width:30,justifyContent:'center',alignItems:'center',height:30,borderRadius:15,backgroundColor:'transparent',margin:5}} >
                            <MaterialIcons name="mode-edit" size={25} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async()=>await dispatch(dishActions.deleteDish(itemData.item.id))} style={{width:30,justifyContent:'center',alignItems:'center',height:30,borderRadius:15,backgroundColor:'transparent',margin:5}} >
                            <Entypo name="cross" size={25} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <ScrollView horizontal style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>{itemData.item.spicy.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>{foodType[itemData.item.type].title}</Text>
                    </TouchableOpacity>
                    <FlatList
                    horizontal={true}
                        data={itemData.item.cuisine}
                        renderItem={itemdata=>{
                            return(
                                <TouchableOpacity style={{backgroundColor:'#ec0c41',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2 }}>
                                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center'}}>{itemdata.item} 🍱</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <TouchableOpacity style={{backgroundColor:'#ec0c41',  padding:8, borderRadius:8, margin:6, }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>serves: {itemData.item.noServe}</Text>
                    </TouchableOpacity>
                    </ScrollView>

                    <Text style={{fontFamily:'medium', fontSize:20}} numberOfLines={1}>{itemData.item.name}</Text>
                    <Text style={{fontFamily:'book', fontSize:16}} numberOfLines={2} >{itemData.item.description}</Text>
                    <Text style={{fontFamily:'bold', fontSize:18}}>₹ {itemData.item.price}</Text>
                    </View>
                }}
                keyExtractor={itemData =>itemData.id}
            />
        </View>
        <FAB title='Add Dish'
            placement='right'
            color='#08818a'
            size='small'
            onPress={()=>{props.navigation.navigate('DishUpload',{types:'Create'})}}
        />
        </SafeAreaView>
    )
}

export default ListScreen