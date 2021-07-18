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
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

const PosStats= ({navigation}) => {
    const orders=useSelector(x=>x.orders.activeOrders)
    const dispatch=useDispatch()
    const [sdate,setSdate]=useState(orders.filter(x=>new Date(x.date).getDate()==new Date().getDate()))
    const[loading,setloading]=useState(false)
    const[index,setIndex]=useState(new Date().getMonth())
    const Months=[{id:0,title:"January"},{id:1,title:"February"},{id:2,title:"March"},{id:3,title:"April"},{id:4,title:"May"},{id:5,title:"June"},{id:6,title:"July"},{id:7,title:"August"},{id:8,title:"September"},{id:9,title:"October"},{id:10,title:"November"},{id:11,title:"December"}];
    const filteredOrders=orders.filter(x=>(new Date(x.date).getMonth())==index)
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), index, 1);
    let [tooltipPos,setTooltipPos] = useState({ x:0, y:0, visible:false, value:0 })
    const rate=[]
    const count=[]
    var getDaysArray =(start, end)=> {
        for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };
    const convert=(txt)=>{
        var date=new Date(txt)
        var dt=date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
        return dt
    }
    var daylist ;
    if(index==new Date().getMonth()){
        daylist = getDaysArray(firstDay,new Date());
    }
    else{
        daylist = getDaysArray(firstDay,new Date(date.getFullYear(), index + 1, 0));
    }

      daylist.map((v)=>v.toISOString().slice(0,10)).join("")
    for(const id in daylist){
        
        if(filteredOrders.some(x=>convert(x.date)==convert(daylist[id]))){
            const newarr=filteredOrders.filter(x=>convert(x.date)==convert(daylist[id]))
            var amount=0;
            if(newarr.length!=0)
            {
                for(const k in newarr){
                    amount+=parseInt(newarr[k].orderWorth)
                }
                rate.push(amount)
                count.push(newarr.length)
            }
        }
        else{
            count.push(0)
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
      const year=new Date().getFullYear()
      var mth=index<10?'0'+index:index
      const screenWidth = Dimensions.get("window").width;
      
      //console.log(count)
    useEffect(()=>{
        const fetch=async()=>{
            setloading(true)
            await dispatch(fetchOrders())
            setloading(false)
        }
        fetch()
    },[dispatch])
    if(loading){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
        <View style={{width:150,height:120}} >
            <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
        </View>
    </View>)
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}} >
        {count.every(item=>item==0)?<View style={{flex:1,justifyContent:'flex-end',alignSelf:'center'}} >
        <Text style={{textAlign:'center',fontSize:16,fontFamily:'medium',color:'black'}} >No Orders</Text>
        <View style={{width:Dimensions.get('screen').width*0.8,height:Dimensions.get('screen').height*0.3}} >
        <Image source={require('../../assets/noorders.png')} style={{width:'100%',height:'100%'}} />
        </View>
            
        </View>:<LineChart
        withDots
        decorator={()=>{
            return tooltipPos.visible ? <View>
       <Svg>
       <Rect x={tooltipPos.x -15} y={tooltipPos.y + 10} width="40"  
        height="30" fill="#ededed" />
       <TextSVG
          x={tooltipPos.x + 5}
          y={tooltipPos.y + 30}
          fill="#08818a"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle">
          {tooltipPos.value}
       </TextSVG>
       </Svg>
     </View> : null
        }}
        onDataPointClick={(data) => {
     // check if we have clicked on the same point again
     let isSamePoint = (tooltipPos.x === data.x 
                         && tooltipPos.y ===  data.y)
   
     // if clicked on the same point again toggle visibility
     // else,render tooltip to new position and update its value
     isSamePoint ? setTooltipPos((previousState)=> {
                        return {
                             ...previousState, 
                             value:data.value,
                             visible:!previousState.visible}
                        })
                  : 
                setTooltipPos({x: data.x, 
                   value:data.value, y:data.y,
                   visible:true
                });
   }}
        data={{
               labels:daylist,
      datasets: [
        {
          data:count
        },
        {
            data:[0]
        },
        {
            data:[10]
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
        fromZero={true}
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
        showsHorizontalScrollIndicator={false}
            data={Months}
            initialScrollIndex={new Date().getMonth()}
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

export default PosStats