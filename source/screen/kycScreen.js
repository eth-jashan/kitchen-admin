import React, { useState } from 'react'
import {View, StyleSheet, Text, Pressable, Dimensions} from 'react-native'
import {TextInput} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const KycScreen = () => {

    const [code, setCode] = useState('')

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Addhaar Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    typ
                    label = 'Adhaar Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>

                <Pressable style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Adhaar Front</Text>
                </Pressable>

                <Pressable style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a', alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Adhaar Back</Text>
                </Pressable>

            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Addhaar Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    type="outline"
                    label = 'Pan Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>

                <Pressable style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Pancard</Text>
                </Pressable>

            </View>

            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:24}}>Addhaar Details</Text>
                
                <View style={{marginVertical:12, alignSelf:'center'}}>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    type="flat"
                    label = 'Pan Number'
                    theme ={{colors:{primary:'#08818a',underlineColor:'transparent'}}}
                    style={{ fontFamily: 'medium', fontColor: '#08818a', height: 70, width:Dimensions.get('screen').width*0.95, alignSelf:'center' }}
                />
                </View>

                <Pressable style={{width:Dimensions.get('screen').width*0.95, borderRadius:5, borderWidth:0.5, borderColor:'#08818a',alignSelf:'center'}}>
                    <Text style={{fontFamily:'book', alignSelf:'center', color:'#08818a'}}>Upload Pancard</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )

}

export default KycScreen