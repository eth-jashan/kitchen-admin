import React, { useState,useEffect } from 'react'
import { TouchableOpacity,Image, Dimensions } from 'react-native'
import {View, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

//components
import AllOrderList from '../component/allOrderList';
import ActiveOrderList from '../component/activeOrderList';

//actions
import { fetchOrders } from '../../store/action/orders';

const OrderScreen = () => {

    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const orderList = useSelector(x=>x.orders.orders)
    const activeOrderList = useSelector(x=>x.orders.activeOrders)
    console.log("orders", activeOrderList)

    const orderFetch = async() => {
        setLoad(true)
        await dispatch(fetchOrders())
        setLoad(false)
    }

  useEffect(()=>{
    orderFetch()
},[dispatch])

    const onLoad = () => {
        setLoad(true)
    }
    const onEndLoad = () => {
        setLoad(false);
    }

    const [result, setResult] = useState('active')

    const allOrder = () => {
        setResult('all')
        orderFetch()
    }

    const activeOrder = () => {
        setResult('active')
        orderFetch()
        
    }

    const preOrder = () => {
        setResult('preorder')
        
    }

    if(load){

        <View style={{flex:1, width:'100%', height:'100%', backgroundColor:'white'}}>
            <ActivityIndicator
                size='large'
                style={{alignSelf:'center'}}
            />
        </View>

    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>

             <View style={{width:"90%", alignSelf:'center'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{alignSelf:'center'}}>
                
                <TouchableOpacity onPress={allOrder} style={{padding:8,  borderColor:result==='all'?'#08818a':'#bcbcbc',   borderBottomWidth:result==='all'?2:1}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:result==='all'?'#08818a':'#bcbcbc',}}>All Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={activeOrder} style={{padding:8, borderColor:result==='active'?'#08818a':'#bcbcbc', borderBottomWidth:result==='active'?2:1}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:result==='active'?'#08818a':'#bcbcbc'}}>Accepted Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={preOrder} style={{padding:8, borderColor:result==='preorder'?'#08818a':'#bcbcbc', borderBottomWidth:result==='preorder'?2:1}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:result==='preorder'?'#08818a':'#bcbcbc'}}>Pre Orders</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>

            {load?   <View>
                <View style={{alignSelf:'center',margin:Dimensions.get('window').height*0.3,width:120,height:120,borderRadius:50,justifyContent:'center'}} >
                        <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
                    </View>
            </View>                
            :
            result === 'all'?<AllOrderList onLoad = {onLoad} onEndLoad = {onEndLoad} type={result}/>:
            null}

            {load?null
            :result === 'active'?<ActiveOrderList type={result}/>:null}

        </SafeAreaView>
    )

}

export default OrderScreen;