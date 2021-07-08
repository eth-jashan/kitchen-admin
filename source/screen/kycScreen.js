import React, { useEffect, useState } from 'react'
import {View, StyleSheet,ScrollView,Image, Text, Pressable, Dimensions, Alert} from 'react-native'
import {ActivityIndicator, TextInput} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux';
import { addKyc, fetchKyc } from '../../store/action/profile';


const KycScreen = ({navigation}) => {
    const status=useSelector(x=>x.profile.kycStatus)
    const kyc=useSelector(x=>x.profile.kyc)
    const[name,setName]=useState()
    const[number,setNumber]=useState()
    const [Aadhar, setAadhar] = useState('')
    const [panNumber,setpanNumber]=useState()
    const[fssi,setFssi]=useState()
    const[aadharuri,setAadharuri]=useState()
    const[panuri,setPanuri]=useState()
    const[fssiuri,setFssiuri]=useState()
    const[loading,setLoading]=useState(false)
    const[reason,setReason]=useState()
    const[load,setLoad]=useState(false)
    const dispatch=useDispatch()
    console.log(status,kyc)
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

    const filepreview=async(uri)=>{
        await FileViewer.open(uri)
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

    const addata=()=>{
        setName(kyc[0].name)
        setNumber(kyc[0].number)
        setAadhar(kyc[0].adharNo)
        setpanNumber(kyc[0].panNo)
        setFssi(kyc[0].fssiNo)
        setAadharuri(kyc[0].adharURL)
        setPanuri(kyc[0].panUrl)
        setFssiuri(kyc[0].fssiUrl)
        setReason(kyc[0].reason)
    }
    
    const addData=async()=>{
        if(!name || !number || !aadharuri || !Aadhar || !fssiuri || !fssi || !panuri || !panNumber)
        {
            Alert.alert('Invalid','Please Enter all the inputs',[{text:'Okay'}])
        }
        else{
            setLoading(true)
            await dispatch(addKyc(name,number,aadharuri,Aadhar,fssiuri,fssi,panuri,panNumber))
            setLoading(false)
            
        }
    }

    useEffect(()=>{
       
        const fetch=async()=>{
            setLoad(true)
            await dispatch(fetchKyc())
            setLoad(false)
        }
        fetch()
        if(kyc.length!=0){
            addata()
        }
    },[dispatch])

    if(load){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
        <View style={{width:150,height:120}} >
            <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
        </View>
    </View>)
    }

       if(status=='Under Verification'){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}} >
                    <View style={{margin:10,borderRadius:20,borderWidth:2,width:Dimensions.get('screen').width*0.95,borderColor:'#ffde17'}} >
                    <View style={{alignSelf:'center',margin:10,width:120,height:120,borderRadius:50}} >
                        <Image source={{uri:'https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'}} style={{width:'100%',height:'100%'}} />
                    </View>
                    <View style={{width:Dimensions.get('screen').width*0.95,margin:10,padding:10}} >
                        <Text style={{fontFamily:'book',fontSize:15,color:'black'}} >Hey Chef! Your Submitted Documents are under Verification. We will notify you once it get Verified or some changes are required.</Text>
                        <Text style={{fontFamily:'bold',margin:5,fontSize:18,color:'#08818a',textAlign:'center'}} >Happy Cooking!!!</Text>
                    </View>
                    </View>
                </View>
            )
        }

        if(status=='Verified'){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}} >
                    <View style={{margin:10,borderRadius:20,borderWidth:2,width:Dimensions.get('screen').width*0.95,borderColor:'green'}} >
                    <View style={{alignSelf:'center',margin:10,width:120,height:120,borderRadius:50}} >
                        <Image source={{uri:'https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif'}} style={{width:'100%',height:'100%'}} />
                    </View>
                    <View style={{width:Dimensions.get('screen').width*0.95,margin:10,padding:10}} >
                        <Text style={{fontFamily:'book',fontSize:15,color:'black'}} >Hey Chef! Your Kyc documents has been verified Now you can make your store Online!! </Text>
                        <Text style={{fontFamily:'bold',margin:5,fontSize:18,color:'#08818a',textAlign:'center'}} >Happy Cooking!!!</Text>
                    </View>
                    </View>
                </View>
            )
        }

        if(status=='Rejected'){
            return(
                <SafeAreaView>
                    <View style={{width:'90%',marginTop:10, padding:12, borderWidth:0.75, borderColor:'red', borderRadius:8, alignSelf:'center'}} >
                <Text style={{color:'red',fontFamily:'book',fontSize:12}} >Hey Chef! Your Kyc documents has been rejected.The Reason for the Rejection is : {reason}</Text>
            </View>
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
                    <Pressable onPress={filepreview.bind(aadharuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{aadharuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setAadharuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
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
                    <Pressable onPress={filepreview.bind(panuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{panuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setPanuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
    
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
                    <Pressable onPress={filepreview.bind(fssiuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{fssiuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setFssiuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
    
                    <Pressable onPress={addData} style={{marginTop:16,width:Dimensions.get('screen').width*0.95,height:50, borderRadius:5, borderWidth:0.5, backgroundColor:'#08818a',alignSelf:'center', marginVertical:10, justifyContent:'center'}}>
                    {loading?<View><ActivityIndicator size='small' color='#ffffff' /></View>:<Text style={{fontFamily:'book', alignSelf:'center', color:'white'}}>Apply</Text>
    }
                    </Pressable>
    
                </View>
            </ScrollView>
                </SafeAreaView>
            )
        }
    
    if(status===null || status===undefined){
        return(
            <SafeAreaView style={{flex:1}}>
            <Text style={{textAlign:'center',margin:10,fontSize:20,color:'black',fontFamily:'bold'}} >Add Kyc Details</Text>
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
                    <Pressable onPress={filepreview.bind(aadharuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{aadharuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setAadharuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
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
                    <Pressable onPress={filepreview.bind(panuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{panuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setPanuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
    
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
                    <Pressable onPress={filepreview.bind(fssiuri)} style={{width:'90%', padding:12, borderWidth:0.75, borderColor:'#08818a', borderRadius:8, flexDirection:'row', alignSelf:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome style={{alignSelf:'center'}} name="file-pdf-o" size={24} color={"#08818a"} />
                    <Text style={{fontFamily:'book', color:'#08818a',alignSelf:'center', marginLeft:8}}>{fssiuri.name}</Text>
                    </View>
                    <MaterialIcons onPress={()=>setFssiuri(false)} name="cancel" size={24} color="#e4003e" />
                    </Pressable>}
    
                    <Pressable onPress={addData} style={{marginTop:16,width:Dimensions.get('screen').width*0.95,height:50, borderRadius:5, borderWidth:0.5, backgroundColor:'#08818a',alignSelf:'center', marginVertical:10, justifyContent:'center'}}>
                    {loading?<View><ActivityIndicator size='small' color='#ffffff' /></View>:<Text style={{fontFamily:'book', alignSelf:'center', color:'white'}}>Apply</Text>
    }
                    </Pressable>
    
                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }

}

export default KycScreen