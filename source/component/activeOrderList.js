import React, { useState } from 'react'
import {Dimensions, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from './activeCard'

//actions
import { changeStatus } from '../../store/action/orders'
import { ActivityIndicator } from 'react-native-paper'

const ActiveOrderList = (props) => {
    const dispatch = useDispatch();
    const[load,setLoad] = useState(false)
   
    const statusChange = async(id,status) => {
        await dispatch(changeStatus(id,status))
     }

    const activeOrderList = useSelector(x=>x.orders.activeOrders)

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