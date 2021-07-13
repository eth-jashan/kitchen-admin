import React, { useState } from 'react'
import {Dimensions, View,Image,Text} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from './activeCard'

//actions
import { changeStatus } from '../../store/action/orders'
import { ActivityIndicator } from 'react-native-paper'

const AllOrderList = (props) => {
    const dispatch = useDispatch()
    const ChangeStatus = async(id,status,date,len) => {
        if(status=='Cancelled'){
            Alert.alert('Cancel Orders?','Are you Sure you want to Cancel the order',[{text:'Yes',onPress:async()=>await dispatch(changeStatus(id,status,date,len))},{text:'No'}])
        }
        else{
            props.onLoad()
            await dispatch(changeStatus(id,status,date,len))
            props.onEndLoad()
        }
        
     }

    const orderList = useSelector(x=>x.orders.orders)
    if(orderList.length==0){
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
            <FlatList
                 data={orderList}
                keyExtractor={x=>x.id}
                renderItem={({item}) => {
                    
                    return<ActiveCard
                            statusChange = {ChangeStatus}
                            type={props.type}
                            item={item}
                        />
                }}
            />
        </View>
    )

}

export default AllOrderList;