import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import {View, Text, Image, Pressable,ScrollView,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../store/action/orders'
import {BarChart, LineChart} from "react-native-chart-kit";
import CalendarStrip from 'react-native-calendar-strip';

const ProfileScreen = ({navigation}) => {
    const orders=useSelector(x=>x.orders.activeOrders)
    const dispatch=useDispatch()
    const [result,setResult]=useState('orders')
    const Months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const filteredOrders=orders.filter(x=>(new Date(x.date).getMonth()+1)==12?0==new Date().getMonth():(new Date(x.date).getMonth()+1)==new Date().getMonth() && new Date(x.date).getFullYear()==(new Date(x.date).getMonth()!=11? new Date().getFullYear():new Date().getFullYear-1) )
    const dates=[]
    const rate=[]
    const count=[]
    for(const key in filteredOrders){
        dates.push(filteredOrders[key].date)
        }
    for(const id in dates){
        if(filteredOrders.some(x=>x.date==dates[id])){
            const newarr=filteredOrders.filter(x=>x.date==dates[id])
            var amount=0;
            for(const k in newarr){
                amount+=parseInt(newarr[k].orderWorth)
            }
            rate.push(amount)
            count.push(newarr.length)
        }
    }
    const chartConfig = {
        
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(8, 129, 138, ${opacity})`,
      };
      const screenWidth = Dimensions.get("window").width;
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchOrders())
        }
        fetch()
    },[dispatch])
    const index=new Date().getMonth()
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}} >
        <LineChart
            data={{
      datasets: [
        {
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
          ]
        }
      ]
    }}
        style={{
            flex:1,
            justifyContent:'flex-end',
            paddingRight:5
        }}
        width={screenWidth}
        height={Dimensions.get('screen').height*0.5}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        bezier
        />
        <View style={{position:'absolute',width:screenWidth}} >
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          selectedDate={new Date()}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: '#08818a' }}
          calendarColor={'transparent'}
          dateNumberStyle={{ color: '#08818a' }}
          dateNameStyle={{ color: '#08818a' }}
          highlightDateNumberStyle={{ color: '#ffde17' }}
          highlightDateNameStyle={{ color: '#ffde17' }}
          disabledDateNameStyle={{ color: '#08818a' }}
          disabledDateNumberStyle={{ color: '#08818a' }}
          iconContainer={{ flex: 0.1 }}
        />
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}} >
            <View>
            <Text style={{textAlign:'center',color:'#08818a',fontFamily:'medium',fontSize:18}} >Orders</Text>
            <Text style={{textAlign:'center',color:'#08818a',fontFamily:'medium',fontSize:16}} >10</Text>
            </View>
            <View>
                <Text style={{textAlign:'center',color:'#08818a',fontFamily:'medium',fontSize:18}} >Amount</Text>
                <Text style={{textAlign:'center',color:'#08818a',fontFamily:'medium',fontSize:16}} >₹1200</Text>
            </View>
        </View>
        </View>
        </SafeAreaView>
    )

   /* return(
        <SafeAreaView style={{flex:1, backgroundColor:'#ffde17'}}>
            <View style={{justifyContent:'center', alignSelf:'center', width:'100%'}}>
            <Image
                style={{height:200, width:200, alignSelf:'center', justifyContent:'center'}}
                source={{uri:'https://pps.whatsapp.net/v/t61.24694-24/138439538_247936526731668_6214712210083773155_n.jpg?ccb=11-4&oh=34c11671276c192536fcb23f9edba0db&oe=60A708C8'}}
            />
            </View>
            <Pressable onPress={()=>navigation.navigate('Creation')} style={{marginVertical:100, backgroundColor:'#08818a', padding:8, borderRadius:8, width:'88%', alignSelf:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:24, alignSelf:'center', color:'white'}}>Join as chef</Text>
            </Pressable>
        </SafeAreaView>
    )*/

}

export default ProfileScreen