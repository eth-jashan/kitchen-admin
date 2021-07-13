import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import {View, Text, Image, Pressable,ScrollView,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../store/action/orders'
import {BarChart, LineChart} from "react-native-chart-kit";

const ProfileScreen = ({navigation}) => {
    const orders=useSelector(x=>x.orders.activeOrders)
    const dispatch=useDispatch()
    const [result,setResult]=useState('orders')
    const Months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const filteredOrders=orders.filter(x=>(new Date(x.date).getMonth()+1)==12?0==new Date().getMonth():(new Date(x.date).getMonth()+1)==new Date().getMonth() && new Date(x.date).getFullYear()==(new Date(x.date).getMonth()!=11? new Date().getFullYear():new Date().getFullYear-1) )
    const dates=[]
    const labeldate=[]
    const rate=[]
    const count=[]
    for(const key in filteredOrders){
        dates.push(filteredOrders[key].date)
        labeldate.push(new Date(filteredOrders[key].date).getDay() + '/' +(new Date(filteredOrders[key].date).getMonth()+1) + '/' +new Date(filteredOrders[key].date).getFullYear() )
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
    console.log(new Date().getFullYear-1)
    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(8, 129, 138, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
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
        <ScrollView>
        <Text style={{textAlign:'center',color:'black',fontSize:18,fontFamily:'medium',marginTop:20}} >Last Month POS Status</Text>
        <Text style={{textAlign:'center',color:'black',color:'#08818a',fontSize:16,margin:10,fontFamily:'book'}} >Month:{Months[index-1==-1?11:index-1]} {index-1==-1?new Date().getFullYear()-1:new Date().getFullYear()}</Text>
        <View style={{width:"90%", alignSelf:'center'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{alignSelf:'center'}}>
                
                <TouchableOpacity onPress={()=>setResult('orders')} style={{padding:8,  borderColor:result==='orders'?'#08818a':'#bcbcbc',   borderBottomWidth:result==='all'?2:1}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:result==='orders'?'#08818a':'#bcbcbc',}}>Orders Stats</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setResult('rate')} style={{padding:8, borderColor:result==='rate'?'#08818a':'#bcbcbc', borderBottomWidth:result==='active'?2:1}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:result==='rate'?'#08818a':'#bcbcbc'}}>Income stats</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
        <View style={{marginTop:20}} >
           {result=='orders'? <LineChart
            data={{
      labels: ["12-06-21", "15-06-21", "17-06-21", "21-06-21", "25-06-21", "30-06-21"],
      datasets: [
        {
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 100,
            Math.random() * 10,
            Math.random() * 10
          ]
        }
      ]
    }}
            width={screenWidth}
             height={Dimensions.get('screen').height*0.6}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              
              fromZero={true}
            />:
            <BarChart
                data={{
            labels: labeldate,
            datasets: [
            {
             data:rate
            }
            ]
           }}
                width={screenWidth}
                height={Dimensions.get('screen').height*0.6}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                yAxisLabel='₹'
                fromZero={true}
            />}
        </View>
        <View style={{flexDirection:'row',padding:20,justifyContent:'space-between'}} >
            <View>
            <Text style={{textAlign:'center',color:'black',fontSize:18,fontFamily:'book'}} >Total Orders</Text>
            <Text style={{textAlign:'center',color:'#08818a',fontSize:18,fontFamily:'medium'}} >{count.length}</Text>
            </View>
            <View >
            <Text style={{textAlign:'center',color:'black',fontSize:18,fontFamily:'book'}} >Total Amount</Text>
            <Text style={{textAlign:'center',color:'#08818a',fontSize:18,fontFamily:'medium'}} >₹{rate.reduce((a, b) => a + b, 0)}</Text>
            </View>
        </View>
        </ScrollView>
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