import React, { useState } from 'react'
import {View, Dimensions, Text, Image, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';





const ActiveCard = ({item,type,statusChange}) => {

    


    const statusColor = () => {

        if(item.status[item.status.length - 1].status === 'Pending'){
            return '#f7cb73'
        }else if (item.status[item.status.length - 1].status=== 'Accepted'){
            return '#218721'
        }
        else if(item.status[item.status.length - 1].status ==='Delivered'){
            return '#357ABD'
        }else if(item.status[item.status.length - 1].status ==='Not Accepted'){
            return 'red'
        }
        else if(item.status[item.status.length - 1].status ==='Cancelled'){
            return 'red';
        }

    }

    const cartArray = []

    class CartModel {
        constructor(id, name, price,  category, catid, image, quantity, mrp){
            this.id = id;
            this.name = name;
            this.price = price;
            this.category = category;
            this.catid = catid;
            this.image = image;
            this.quantity = quantity
            this.mrp = mrp
        }
    }
    const cartObject = item.dishes
    for(const key in cartObject){
        cartArray.push(new CartModel(key, cartObject[key].name, cartObject[key].price, cartObject[key].category,cartObject[key].catid, cartObject[key].image, cartObject[key].quantity, cartObject[key].mrp))
    }


    return(
        <View style={{width:Dimensions.get('window').width, padding:8,marginTop:10}}>
            {/* <Text style={{fontFamily:'light'}}>{item.id}</Text> */}
            <View  style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:18, fontFamily:'medium'}}>{item.customerName}</Text>
                    <Text style={{fontFamily:'light', fontSize:14}}>{item.location[0].SA.houseAddress}</Text>
                </View>
                <View style={{padding:6, justifyContent:'center',backgroundColor:statusColor(), alignSelf:'center', borderRadius:8}}>
                <Text style={{color:'white', fontSize:14, alignSelf:'center', fontFamily:'book'}}>{item.status[item.status.length - 1].status}</Text>
                <Text style={{color:'white', fontSize:14, alignSelf:'center', fontFamily:'book'}}>at {item.status[item.status.length - 1].time}</Text>
                </View>
            </View>
            
            <View style={{marginVertical:6, width:'100%', borderStyle:"dotted", borderColor:'#bcbcbc', borderWidth:0.75}} />
            <Text style={{fontFamily:'medium', fontSize:14}}>Placed On {new Date(item.date).toDateString()}</Text>

            {cartArray.map((item, index) => {
                return<View key={index} style={{width:'100%', padding:6, marginTop:8, flexDirection:'row'}}>
                    <Image
                        style={{width:60, height:60, borderRadius:8}}
                        source={{uri:item.image}}
                    />
                    <View style={{left:10}}>
                        <Text numberOfLines={1} style={{fontSize:16, fontFamily:'medium'}}>{item.name}</Text>
                        <Text numberOfLines={1} style={{fontSize:14, fontFamily:'light'}}>₹ {item.price}</Text>
                        <Text numberOfLines={1} style={{fontSize:14, fontFamily:'book'}}>x {item.quantity}</Text>
                    </View>
                </View>
            })}

            <View style={{marginVertical:6, width:'100%', borderStyle:"dotted", borderColor:'#bcbcbc', borderWidth:0.75}} />
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'medium', fontSize:18}}>Bill Total</Text>
                <Text style={{fontFamily:'book', fontSize:18}}>₹ {item.orderWorth}</Text>
            </View>
            {/*  */}
            {type === 'all' && item.status[item.status.length - 1].status === 'Pending' ?<View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress= {() => {statusChange(item.id,'Accepted',new Date().toLocaleTimeString(),item.status.length)}} 
                style={{width:'30%', padding:10, justifyContent:'center', alignSelf:'center', borderRadius:4, backgroundColor:'#1fa803',marginTop:15,marginHorizontal:15 ,marginBottom:16}}>
            <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress= {() => {statusChange(item.id,'Not Accepted',new Date().toLocaleTimeString(),item.status.length)}} 
                style={{width:'30%', padding:10, justifyContent:'center', alignSelf:'center', borderRadius:4, backgroundColor:'#ff6161', marginTop:15,marginHorizontal:15, marginBottom:16}}>
            <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Decline</Text>
            </TouchableOpacity>
            </View>:type === 'all' && item.status[item.status.length - 1].status === 'Accepted' ?
            <View style={{justifyContent:'center',alignItems:'center'}} >
            <TouchableOpacity onPress= {() => {statusChange(item.id,'Cancelled',new Date().toLocaleTimeString(),item.status.length)}} 
                style={{width:'70%', padding:10, justifyContent:'center', alignSelf:'center', borderRadius:10, backgroundColor:'#1fa803',marginTop:15,marginHorizontal:15 ,marginBottom:16}}>
            <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Cancel</Text>
            </TouchableOpacity>
            </View>
            :null}

            {/* <View style={{marginTop:6, marginBottom:12, width:'100%', borderStyle:"dotted", borderColor:'black', borderWidth:0.75}} /> */}
        </View>
    )

}

export default ActiveCard