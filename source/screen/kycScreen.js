import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, Pressable, Dimensions, Alert} from 'react-native'
import {TextInput} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer';
import { useDispatch } from 'react-redux';
import { addKyc } from '../../store/action/profile';

const KycScreen = () => {
    const[name,setName]=useState()
    const[number,setNumber]=useState()
    const [Aadhar, setAadhar] = useState('')
    const [panNumber,setpanNumber]=useState()
    const[fssi,setFssi]=useState()
    const[aadharuri,setAadharuri]=useState()
    const[panuri,setPanuri]=useState()
    const[fssiuri,setFssiuri]=useState()
    const dispatch=useDispatch()
    const FilePicker=async(type)=>{
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
            if(type=='Aadhar'){
                setAadharuri(res.uri)
            }
            else if(type='Pan'){
                setPanuri(res.uri)
            }
            else{
                setFssiuri(res.uri)
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker
            } else {
              Alert.alert('Error','Something Went Wrong,Please Try Again',[{text:'Okay'}])
            }
          }
    }

    const PreviewFile=async(type)=>{
        if(type=='Aadhar'){
            await FileViewer.open(aadharuri)
        }
        else if(type='Pan'){
            await FileViewer.open(panuri)
        }
        else{
            await FileViewer.open(fssiuri)
        } 
    }
    
    const FileView=props=>{
        return(
            <Pressable onPress={()=>PreviewFile(props.type)} >
                <View style={{padding:10,margin:10,width:Dimensions.get('screen').width*0.90,flexDirection:'row',borderRadius:5, borderWidth:0.5, borderColor:'#08818a'}} >
                <View style={{marginRight:5}} >
                <MaterialCommunityIcons name="pdf-box" size={30} color="Red" />
                </View>
                <View style={{marginLeft:5}}  >
                   <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}} > {props.type=='Aadhar'?'Aadhar Card':props.type=='Pan'?'Pan Card':'Fssi Details'} </Text>
                </View>
                </View>
            </Pressable>
        )
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
        <View style={{width:'100%', padding:8}} >
        <TextInput
            value={name}
            onChangeText={setName}
            type='flat'
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
            style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        </View>
            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Addhaar Details</Text>
                
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
                {aadharuri?<FileView type='Aadhar' />:null}
                <Pressable onPress={()=>FilePicker('Aadhar')}  style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Adhaar Card</Text>
                </Pressable>
            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Pan Card Details</Text>
                
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
                {panuri?<FileView type='Pan' />:null}
                <Pressable onPress={()=>FilePicker('Pan')} style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Pancard</Text>
                </Pressable>

            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Fssi Details</Text>
                
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
                {fssiuri?<FileView type='fssi' />:null}
                <Pressable onPress={()=>FilePicker('fssi')} style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Fssi</Text>
                </Pressable>

                <Pressable onPress={addData} style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Submit All Documents</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )

}

export default KycScreen