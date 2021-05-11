import React,{useState,useEffect} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
export default function Tasks({route,navigation}) {
    const[tasksfound,settasksfound]=useState(false)
    const[tasklist,settasklist]=useState({})
    useEffect(() => {
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://ca41f4079b19.ngrok.io/tasksfetch/'+e+'/'+route.params.taskname)
            .then(function(res) {
                if(res.data!="No Task found"){
                settasklist(res.data)
                settasksfound(true)
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }, [])
    const tocomplete=()=>{
        console.log("Tick pressed")
    }
    const toincomplete=()=>{
        console.log("Close Pressed")
    }
    const deleteclicked=()=>{
        console.log("Delete Clicked")
    }
    const editclicked=()=>{
        console.log("Edit Clicked")
        return(
            <View>
                <Text>
                    HI
                </Text>
            </View>
        )
    }
    
    return (
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
        <SafeAreaView>
            <Text style={{color:'white',textAlign:'right',fontSize:40}}>
                {route.params.taskname}
            </Text>
        </SafeAreaView>
        <View>
            <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your Tasks</Text>
        </View>
        <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,paddingBottom:75}}>
            <Text style={{color:"#FF003E",textAlign:'center',fontSize:40}}>Incomplete</Text>
            {
                tasksfound==false?
                <Text>Not found</Text>
                :
                tasklist.map((task)=>{
                    if(task[1]=="incomplete"){
                    return(
                        <View style={styles.task_view}>
                            <Text style={styles.task_view_title}>{task[0]}</Text>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <TouchableOpacity onPress={tocomplete}>
                                <Image source={require('../assets/done.png')} style={{width:45, resizeMode:'contain', marginLeft:50}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteclicked}>
                                <Image source={require('../assets/delete.png')} style={{width:45, resizeMode:'contain',}}/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={editclicked}>
                                <Image source={require('../assets/edit.png')} style={{width:45, resizeMode:'contain',marginRight:50}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                })
            }

            <Text style={{color:"#FF003E",textAlign:'center',fontSize:40}}>Completed</Text>
            {
                tasksfound==false?
                <Text>Not found</Text>
                :
                tasklist.map((task)=>{
                    if(task[1]=="complete"){
                    return(
                        <View  style={styles.task_view}>
                            <Text style={styles.task_view_title}>{task[0]}</Text>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={toincomplete}>
                                <Image source={require('../assets/close.png')} style={{width:45, resizeMode:'contain',marginLeft:50}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteclicked}>
                                <Image source={require('../assets/delete.png')} style={{width:45, resizeMode:'contain',}}/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={editclicked}>
                                <Image source={require('../assets/edit.png')} style={{width:45, resizeMode:'contain',marginRight:50}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                })
            }
        </ScrollView>
        <TouchableOpacity style={{backgroundColor:"#FF003E",position:'absolute',bottom:0,right:0,width:75,height:75,flex:1,flexDirection:'row',alignItems:'center',borderTopLeftRadius:25}}>
            <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
            <Text style={{fontSize:60,color:'white'}}>+</Text>
            </View>
        </TouchableOpacity>
        
    </View>
    )
}
const styles = StyleSheet.create({
    task_view:{
        backgroundColor:"#FF003E",
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        borderRadius:10,
    },
    task_view_title:{
        color:"white",
        fontSize:30
    }
})