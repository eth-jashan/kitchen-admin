import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import {View, Text, Image, Pressable,ScrollView,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../store/action/orders'
import {BarChart, LineChart} from "react-native-chart-kit";
import CalendarStrip from 'react-native-calendar-strip';
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const ProfileScreen = ({navigation}) => {
    const orders=useSelector(x=>x.orders.activeOrders)
    const dispatch=useDispatch()
    const [sdate,setSdate]=useState()
    const[index,setIndex]=useState(0)
    const Months=[{id:0,title:"January"},{id:1,title:"February"},{id:2,title:"March"},{id:3,title:"April"},{id:4,title:"May"},{id:5,title:"June"},{id:6,title:"July"},{id:7,title:"August"},{id:8,title:"September"},{id:9,title:"October"},{id:10,title:"November"},{id:11,title:"December"}];
    const filteredOrders=orders.filter(x=>(new Date(x.date).getMonth()+1)==12?0==index:(new Date(x.date).getMonth()+1)==index && new Date(x.date).getFullYear()==(new Date(x.date).getMonth()!=11? new Date().getFullYear():new Date().getFullYear-1) )
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
    const sum=(data)=>{
        var amt=0
        for(const k in data){
            amt+=parseInt(data[k].orderWorth)
        }
        return amt
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
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}} >
        {count.length==0?<View style={{flex:1,justifyContent:'flex-end',alignSelf:'center'}} >
            <Text>No Orders</Text>
        </View>:<LineChart
        withDots
          onDataPointClick={({value, getColor}) =>
                  {
                      console.log(value)
                      return(
                          <View style={{width:100,height:100,color:'#e5e5e5'}} >
                              <Text>{value}</Text>
                          </View>
                      )
                  }
                }
            data={{
               // labels:dates,
      datasets: [
        {
          data:[
              
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
            Math.random()*10,
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
        height={Dimensions.get('screen').height*0.4}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        bezier
        />}
        <View style={{position:'absolute',width:screenWidth}} >
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          onDateSelected={(date)=>{
              setSdate(orders.filter(x=>new Date(x.date).getDate()==new Date(date).getDate()))
              console.log(sdate)
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
        
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}} >
            <View style={{width:100,height:100,backgroundColor:'#08818a',justifyContent:'center',borderRadius:20}} >
            <Text style={{textAlign:'center',color:'#ffffff',fontFamily:'medium',fontSize:18}} >Orders</Text>
            <Text style={{textAlign:'center',color:'#ffffff',fontFamily:'medium',fontSize:16}} >{sdate==(undefined || null)?'0':sdate.length}</Text>
            </View>
            <View style={{width:100,height:100,backgroundColor:'#08818a',justifyContent:'center',borderRadius:20}} >
                <Text style={{textAlign:'center',color:'#ffffff',fontFamily:'medium',fontSize:18}} >Income</Text>
                <Text style={{textAlign:'center',color:'#ffffff',fontFamily:'medium',fontSize:16}} >₹{sdate==(undefined || null)?'0':sum(sdate)}</Text>
            </View>
        </View>
        <Text style={{textAlign:'center',color:'black',margin:10,fontFamily:'medium',fontSize:15}} >Monthly POS Graph</Text>
        <Text style={{margin:5,color:'black',fontFamily:'medium',fontSize:16}} >Select Month</Text>
        <FlatList
        style={{margin:5}}
        horizontal
            data={Months}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>setIndex(item.id)} style={{backgroundColor:item.id==index?'#08818a':'white',borderRadius:5}} > 
                        <Text style={{margin:10,color:item.id==index?'#ffffff':'black'}} >{item.title}</Text>
                    </TouchableOpacity>
                )
            }}
        />
        </View>
        </SafeAreaView>
    )

}

export default ProfileScreen