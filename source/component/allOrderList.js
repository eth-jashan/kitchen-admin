import React, { useState } from 'react'
import {Dimensions, View,Image,Text} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from './activeCard'
import { BASE_URL } from '../../constants/api_url';

//actions
import { changeStatus } from '../../store/action/orders'
import { ActivityIndicator } from 'react-native-paper'
import { patchOrder } from '../../store/action/dunzo_delivery'
import { Alert } from 'react-native'
import ModalPopup from './ModalPopup'


const AllOrderList = (props) => {
    const dispatch = useDispatch()
    const token  = useSelector(x=>x.dunzo.token)
    const myChef = useSelector(x=>x.profile.chef)
    const[visible,setVisible]=useState(false)
    const[taskid,setTaskid]=useState()
    const[load,setload]=useState(false)
    const[id,setid]=useState()
  //  console.log('my alwasys aaadddd',myOrder.address[0].SA)
    const visibility=(bool)=>{
        setVisible(bool)
    }
    const orderList = useSelector(x=>x.orders.orders)
//   console.log('orderrrrrss:',orderList[0].address[0].SA)
     const danzoCreateOrder = async(myOrder,id,status,date,len,myChef) => {
         let Address = myOrder.address[0].SA
         console.log('my alwasys',myOrder)
         console.log('long',Address.long)
         console.log('chef',myChef)
         try{
             const response = await fetch(`https://apis-staging.dunzo.in/api/v1/tasks`,{
                 method:'POST',
                 headers:{
                     "client-id":BASE_URL.client_id,
                     "Authorization":token,
                     "Content-Type":"application/json",
                     "Accept-Language": 'en_US'
                 },
                 body:JSON.stringify({
                    "request_id":myOrder.id,
                    "pickup_details":{"lat":myChef.lat,"lng":myChef.long,
                                        "address":{"apartment_address":myChef.useraddress,"street_address_1":myChef.address,"street_address_2":myChef.landMark,
                                            "landmark":myChef.landMark,
                                            "city":myChef.city,
                                            "state":"Maharashtra",
                                            "pincode":myChef.pincode,
                                            "country":"India"
                                        }
                                    },
                    "drop_details"  :{"lat":Address.lat,"lng":Address.long,
                                        "address":{"apartment_address":Address.houseAddress,
                                                "street_address_1":Address.generatedAddress,
                                                "street_address _2":Address.direction,
                                                "landmark":Address.landmark,
                                                "city":Address.city,
                                                "state":"Maharashtra",
                                                "pincode":Address.postal,
                                                "country":"India"
                                        }
                                    },
                    "sender_details":{"name":myChef.name,"phone_number":myChef.phone},
                    "receiver_details":{"name":myOrder.customerName,"phone_number":myOrder.phoneNumber},
                    "package_content":["Food | Flowers"] 
             })
             })
             const resData = await response.json();
             if(resData.code === 'unserviceable_location_error'){
                Alert.alert("Not serviceable",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'internal_server_error'){
                Alert.alert("Error",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'duplicate_request'){
                Alert.alert("Error",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'rain_error'){
                Alert.alert("Heavy Rainfall",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'different_city_error'){
                Alert.alert("Error",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'near_by_location_error'){
                Alert.alert("Location is Nearby",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'bad_request'){
                Alert.alert("Error",resData.message,[{text:'okay'}])
             }
             else if(resData.code === 'validation_failed'){
                Alert.alert("Error",resData.message,[{text:'okay'}])
             }
             else{
                // await dispatch(changeStatus(id,status,date,len))
                 await dispatch(patchOrder(id,resData.state,resData.estimated_price,resData.eta,resData.task_id))
                 await dispatch(changeStatus(id,resData.state,date,len))
                 //Alert.alert("Your Order Has Been Placed",`Id-${resData.task_id}`,[{text:'Proceed'}])
                 //modal ref changes here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                 setTaskid(resData.task_id)
                 setVisible(true)
             }
             console.log('brrrrrrrrrruh',resData)
         }
         catch(error){
            console.log("ERROR", error)
         }
     }

    const ChangeStatus = async(id,status,date,len,myOrder) => {
        if(status=='Cancelled'){
            setload(true)
           await Alert.alert('Cancel Order?','Are you Sure you want to Cancel the order',[{text:'Yes',onPress:async()=>await dispatch(changeStatus(id,status,date,len))},{text:'No'}])
            setload(false)
        }
        else if(status=='Not Accepted'){
            setload(true)
           await Alert.alert('Decline Order?','Are you Sure you want to Decline this order',[{text:'Yes',onPress:async()=>await dispatch(changeStatus(id,status,date,len))},{text:'No'}])
            setload(false)
        }
        else if(status=='Accepted'){
            setload(true)
           await Alert.alert('Accept Order?','Are you Sure you want to Accept this order',[{text:'Yes',onPress:async()=>await dispatch(changeStatus(id,status,date,len))},{text:'No'}])
            setload(false)
        }
        else{
            //props.onLoad()
            setid(id)
            setload(true)
            await danzoCreateOrder(myOrder,id,status,date,len,myChef[0]);
            setload(false)
            //props.onEndLoad()
        }
        
     }

    
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
                            load={load}
                            id={id}
                        />
                }}
            />
            <ModalPopup type={'Orders'} visible={visible} visibility={visibility} taskid={taskid} />
        </View>
        //Modal which describe your order has been created, taskid will resData.task_id,from above danzoCreateOrder response
        //remove comments after completion
    )

}

export default AllOrderList;