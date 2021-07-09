import React, { useState } from 'react'
import {Dimensions, View,Image,Text} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from './activeCard'

//actions
import { changeStatus } from '../../store/action/orders'
import { ActivityIndicator } from 'react-native-paper'

const ActiveOrderList = (props) => {
    const dispatch = useDispatch();
    const[load,setLoad] = useState(false)
   
    const statusChange = async(id,status,date,len) => {
        await dispatch(changeStatus(id,status,date,len))
     }

    const activeOrderList = useSelector(x=>x.orders.activeOrders)
    if(activeOrderList.length==0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../assets/noorders.png')} style={{width:300,height:210}} />
                <Text style={{fontFamily:'bold',fontSize:20,color:'#08818a',margin:5}} >No Orders Yet</Text>
                <Text style={{fontFamily:'book',fontSize:15,color:'black',margin:5}} >Looks like you have not added their dishes yet</Text>
        </View>
        )
    }
    return(
        <View style={{flex:1, marginTop:12}}>
            {!load?<FlatList
                 data={activeOrderList}
                keyExtractor={x=>x.id}
                renderItem={({item}) => {
                    
                    return<ActiveCard
                            statusChange = {statusChange}
                            type={props.type}
                            item={item}
                        />
                }}
            />:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size='large' color='#08818a'/></View>}
        </View>
    )

}

export default ActiveOrderList