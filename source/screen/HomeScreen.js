import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import {View, Text, Image, Pressable, ScrollView, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import HomeTab from '../component/homeTab'
import { createToken } from '../../store/action/dunzo_delivery'
import { fetchSpecificChef } from '../../store/action/profile'

const {width, height} = Dimensions.get('window')

const HomeScreen = ({navigation}) => {
    const chef=useSelector(x=>x.profile.chef)
    const dispatch = useDispatch();

    useEffect(()=>{
        const startupCalls = async() => {
            await dispatch(createToken());

    }
        startupCalls()
    },[dispatch])
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchSpecificChef())
        }
        fetch()
    },[dispatch])

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>

                <Pressable onPress={()=>navigation.navigate('Kyc')} style={{width:width*0.94, borderRadius:8, padding:12, height:60, alignSelf:'center', marginTop:10, justifyContent:'center', backgroundColor:'#ffcb2a'}}>
                <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center', color:'white', justifyContent:'center'}}>Make Your Store Online</Text>
                </Pressable>
                <HomeTab
                    index={3}
                    stext={"Check Your Customer's Orders"}
                    text={'Orders'}
                    OnPress = {()=>{navigation.navigate('Orders')}}
                />

                <HomeTab
                    index={0}
                    stext={'Create, Manage and Edit large categories with food'}
                    text={'Menu Creation'}
                    OnPress = {()=>{navigation.navigate('CategoryListScreen')}}
                />
                {/*<HomeTab
                    index={1}
                    stext={'Upload the only the dishes without the menu structure'}
                    text={'Dish Uploads'}
                    OnPress = {()=>{navigation.navigate('DishListScreen',{catId:null})}}
                />*/}
                <HomeTab
                    index={2}
                    stext={'Create Customisable offer banner to make your store attractive'}
                    text={'Banner Upload'}
                    OnPress = {()=>{navigation.navigate('BannerScreen')}}
                />

            </ScrollView>
        </SafeAreaView>
    )

}

export default HomeScreen