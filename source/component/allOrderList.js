import React, { useState } from 'react'
import {Dimensions, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from './activeCard'

//actions
import { changeStatus } from '../../store/action/orders'
import { ActivityIndicator } from 'react-native-paper'

const AllOrderList = (props) => {
    const dispatch = useDispatch()
    const ChangeStatus = async(id,status,date,len) => {
        await dispatch(changeStatus(id,status,date,len))
     }

    const orderList = useSelector(x=>x.orders.orders)

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