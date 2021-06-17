import React, {useState} from 'react'
import {Dimensions, View, FlatList,Text, Pressable} from 'react-native'

const TimeOrder = () => {

    const list = ['Preorder', 'On Demand']
    const [type, setType] = useState(0)
    const [closeD, setCloseD] = useState(0)
    const [delDate, setDelDate] = useState([])
    
    let dates = []
    let delDates = []

    for(let i =0 ; i<8; i++){
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate()+i)
        let dateValue = new Date(currentDate).toDateString() 
        let date = new Date(currentDate).toDateString().split(' ')
        dates.push({day:date[0].toString(), value:dateValue, date:date[1].toString()+' '+date[2].toString()})
    }

    const onClose = (index) => {
        // setDelDate([])
        setCloseD(index)
        let dates = []
        for(let i =0 ; i<4; i++){
            const currentDate = new Date(dates[index])
            currentDate.setDate(currentDate.getDate()+i)
            let dateValue = new Date(currentDate).toDateString() 
            let date = new Date(currentDate).toDateString().split(' ')
            dates.push({day:date[0].toString(), value:dateValue, date:date[1].toString()})
        }
        setCloseD(dates)
        setCloseD(index)

    }
    
    const timeSlot = ['morning ☀️', 'afternoon 🕛', 'evening 🌅', 'night 🌙']
    


    return(
        <View style={{width:Dimensions.get('window').width, padding:8, alignSelf:'center'}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={list}
                keyExtractor={(_, i)=>i.toString()}
                renderItem={({item, index}) => {

                    return<Pressable  onPress={()=>setType(index)} style={{width:Dimensions.get('window').width*0.4, padding:8, alignSelf:'center', margin:5, backgroundColor:index===type?'#08818a':'white', borderRadius:8}}>
                        <Text style={{fontFamily:'medium', color:index===type?'white':'#08818a', alignSelf:'center', fontSize:18}}>{item}</Text>
                    </Pressable>

                }}
            />
            <Text style={{fontFamily:'medium', fontSize:22, marginVertical:16}}>Order Closing Date</Text>
            <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item, index})=>{
                    return<Pressable onPress={()=>onClose(index)} style={{padding:8, borderRadius:6, backgroundColor:index === closeD?'red':'white', borderWidth:0.75, marginHorizontal:4}}>
                        <Text style={{fontFamily:'book', fontSize:16}}>{item.date}</Text>
                    </Pressable>
                }}
            />
        

        <Text style={{fontFamily:'medium', fontSize:22, marginVertical:16}}>Order Delivery Date</Text>
            <FlatList
                data={delDate}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_,i)=>i.toString()}
                renderItem={({item})=>{
                    return<View style={{padding:8, borderRadius:6, backgroundColor:'white', borderWidth:0.75, marginHorizontal:4}}>
                        <Text style={{fontFamily:'book', fontSize:16}}>{item.date}</Text>
                    </View>
                }}
            />
        </View>
        
    )

}

export default TimeOrder