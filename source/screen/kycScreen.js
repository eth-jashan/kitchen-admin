import React, { useEffect, useState } from 'react'
import {View, StyleSheet,ScrollView, Text, Pressable, Dimensions, Alert} from 'react-native'
import {TextInput} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import DocumentPicker from 'react-native-document-picker'
import { useDispatch } from 'react-redux';
import { addKyc } from '../../store/action/profile';

const FileView=props=>{
    return(
            <View style={{padding:10,margin:10,width:Dimensions.get('screen').width*0.90,flexDirection:'row',borderRadius:5, borderWidth:0.5, borderColor:'#08818a'}} >
            <View style={{marginRight:5}} >
            <MaterialCommunityIcons name="pdf-box" size={30} color="red" />
            </View>
            <View style={{marginLeft:5}}  >
               <Text style={{fontFamily:'book', padding:5, color:'#08818a'}} > {props.type=='Aadhar'?'Aadhar Card':props.type=='Pan'?'Pan Card':'Fssi Details'} </Text>
            </View>
            </View>
    )
}

const KycScreen = ({navigation}) => {
    const[name,setName]=useState()
    const[number,setNumber]=useState()
    const [Aadhar, setAadhar] = useState('')
    const [panNumber,setpanNumber]=useState()
    const[fssi,setFssi]=useState()
    const[aadharuri,setAadharuri]=useState()
    const[panuri,setPanuri]=useState()
    const[fssiuri,setFssiuri]=useState()
    const dispatch=useDispatch()

    const adhaarFrontUpload = async() => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
        console.log("Console", res)
        setAadharuri(res)
        }catch(err){
            Alert.alert('Something Went Wrong!!!')
        }
        

    }

    const panCardUpload = async() => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
        console.log("Console", res)
        setPanuri(res)
        }catch(err){
            Alert.alert('Something Went Wrong!!!')
        }
        

    }

    const fssaiUpload = async() => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
        console.log("Console", res)
        setFssiuri(res)
        }catch(err){
            Alert.alert('Something Went Wrong!!!')
        }
        

    }


    

   
    
    
    const addData=async()=>{
        if(!name || !number || !aadharuri || !Aadhar || !fssiuri || !fssi || !panuri || !panNumber)
        {
            Alert.alert('Invalid','Please Enter all the inputs',[{text:'Okay'}])
        }
        else{
            await dispatch(addKyc(name,number,aadharuri,Aadhar,fssiuri,fssi,panuri,panNumber))
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{padding:5}} >
        <View style={{width:'100%', padding:8}} >
        <TextInput
            value={name}
            onChangeText={setName}
            type='outline'
            label = 'Name'
            theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
            style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        <TextInput
            value={number}
            onChangeText={setNumber}
            type='flat'
            label = 'Mobile Number'
            theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
            style={{ fontFamily: 'medium',marginTop:10, fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        </View>
            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'book',color:'black', alignSelf:'center', fontSize:22}}>Aadhaar Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={Aadhar}
                    onChangeText={setAadhar}
                    type='flat'
                    label = 'Adhaar Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                {!aadharuri?<Pressable onPress={adhaarFrontUpload}  style={{borderColor:'#08818a', padding:10, borderRadius:4, width:'90%', alignSelf:'center',borderWidth:1}}>
                    <Text style={{fontFamily:'medium', fontSize:18, color:'#08818a', alignSelf:'center'}}>Add Aadhaar Card</Text>
                </Pressable>:
                <View style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{aadharuri.name}</Text>
                </View>
                <MaterialIcons onPress={()=>setAadharuri(false)} name="cancel" size={24} color="#e4003e" />
                </View>}
            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'book',color:'black', alignSelf:'center', fontSize:22}}>Pan Card Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={panNumber}
                    onChangeText={setpanNumber}
                    type="flat"
                    label = 'Pan Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                {!panuri?<Pressable onPress={panCardUpload}  style={{borderColor:'#08818a', padding:10, borderRadius:4, width:'90%', alignSelf:'center',borderWidth:1}}>
                    <Text style={{fontFamily:'medium', fontSize:18, color:'#08818a', alignSelf:'center'}}>Add Pan Card</Text>
                </Pressable>:
                <View style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{panuri.name}</Text>
                </View>
                <MaterialIcons onPress={()=>setPanuri(false)} name="cancel" size={24} color="#e4003e" />
                </View>}

            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'book',color:'black', alignSelf:'center', fontSize:22}}>Fssi Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={fssi}
                    onChangeText={setFssi}
                    type="flat"
                    label = 'Fssi Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>
                {!fssiuri?<Pressable onPress={fssaiUpload} style={{borderColor:'#08818a', padding:10, borderRadius:4, width:'90%', alignSelf:'center',borderWidth:1}}>
                    <Text style={{fontFamily:'medium', fontSize:18, color:'#08818a', alignSelf:'center'}}>Add FSSAI Certificate</Text>
                </Pressable>:
                <View style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{fssiuri.name}</Text>
                </View>
                <MaterialIcons onPress={()=>setFssiuri(false)} name="cancel" size={24} color="#e4003e" />
                </View>}

                <Pressable onPress={()=>navigation.navigate('Home')} style={{marginTop:16,width:Dimensions.get('screen').width*0.95,height:50, borderRadius:5, borderWidth:0.5, backgroundColor:'#08818a',alignSelf:'center', marginVertical:10, justifyContent:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'white'}}>Apply</Text>
                </Pressable>

            </View>
        </ScrollView>
        </SafeAreaView>
    )

}

export default KycScreen