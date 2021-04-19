import React from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native'

export default function Tasks() {
    return (
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
        <SafeAreaView>
            <Text style={{color:'white',textAlign:'right',fontSize:40}}>
                Hello !
            </Text>
        </SafeAreaView>
        <View>
            <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your Tasks</Text>
        </View>
        <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30}}>
            <Text style={{color:"#FF003E",textAlign:'center',fontSize:40}}>Incomplete</Text>
            <Text style={{color:"#FF003E",textAlign:'center',fontSize:40}}>Completed</Text>
        </ScrollView>
        <TouchableOpacity style={{backgroundColor:"#FF003E",position:'absolute',bottom:0,right:0,width:75,height:75,flex:1,flexDirection:'row',alignItems:'center',borderTopLeftRadius:25}}>
            <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
            <Text style={{fontSize:60,color:'white'}}>+</Text>
            </View>
        </TouchableOpacity>
        
    </View>
    )
}
