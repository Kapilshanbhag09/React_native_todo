import React,{useState,useEffect} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity,Image,Modal,TextInput,Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
export default function Tasks({route,navigation}) {
    const[tasksfound,settasksfound]=useState(false)
    const[tasklist,settasklist]=useState({})
    const[editmodel,seteditmodel]=useState(false)
    const[addtaskmodel,setaddtaskmodel]=useState(false);
    const[newtaskname,setnewtaskname]=useState('');
    const[usehandler,setusehandler]=useState(false)
    const[edittasknamefrom,setedittasknamefrom]=useState('')
    const[edittasknameto,setedittasknameto]=useState('');
    useEffect(() => {
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/tasksfetch/'+e+'/'+route.params.taskname)
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
    }, [usehandler])

    //Add task function
    const addtask=()=>{
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/addtask/'+e+'/'+route.params.taskname+'/'+newtaskname)
            .then(function(res) {
                if(res.data=="Task Inserted"){
                   setusehandler(!usehandler);
                   setnewtaskname('');
                    Alert.alert(
                        "Inserted !",
                        "New Task has been inserted at the end",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log(''),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => setaddtaskmodel(false) }
                        ]
                      );
                    
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }
    //Task complete function
    const tocomplete=taskname=>()=>{
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/taskcompleted/'+e+'/'+route.params.taskname+'/'+taskname)
            .then(function(res) {
                if(res.data=="Added to completed"){
                    setusehandler(!usehandler);
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }
    const toincomplete=taskname=>()=>{
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/tasknotcompleted/'+e+'/'+route.params.taskname+'/'+taskname)
            .then(function(res) {
                if(res.data=="Added to Incomplete"){
                    setusehandler(!usehandler);
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });

    }
    const deletetask=taskname=>()=>{
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/deletetask/'+e+'/'+route.params.taskname+'/'+taskname)
            .then(function(res) {
                if(res.data=="Task deleted"){
                    setusehandler(!usehandler)
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });



    }
    const editclicked=taskname=>()=>{
        setedittasknamefrom(taskname);
        setedittasknameto(taskname);
        seteditmodel(true)

    }
    const edittask=()=>{
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://67c192299887.ngrok.io/edittask/'+e+'/'+route.params.taskname+'/'+edittasknamefrom+'/'+edittasknameto)
            .then(function(res) {
                if(res.data=="Task Edited"){
                    setusehandler(!usehandler)
                    Alert.alert(
                        "Edited !",
                        "Your Task has been Edited",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log(''),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => seteditmodel(false) }
                        ]
                      );

                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }
    
    return (
       
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
             {/* ====================Edit Model ========================== */}
            <Modal transparent={true} visible={editmodel}>
                <View style={{backgroundColor:"#000000aa",flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View style={{backgroundColor:"#ffffff",flexDirection:'column',flex:1,marginLeft:50,marginRight:50}}>
                        <View>
                        <Text style={{color:"#FF003E",fontWeight:'bold',fontSize:30,marginLeft:30,marginBottom:10,marginTop:10,}}>Edit task name</Text>
                        <TextInput style={{ borderBottomWidth:2,borderBottomColor:"#FF003E",height:30,fontSize:25,marginBottom:5,color:'#FF003E',marginLeft:20,marginRight:20}}
                  value={edittasknameto}
                  onChangeText={(t)=>setedittasknameto(t)}
               />
                    
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,borderRadius:100}}onPress={edittask}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,marginTop:0,borderRadius:100}}onPress={()=>seteditmodel(false)}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
            </Modal>
            {/* ===============Add Task Model ================= */}
            <Modal transparent={true} visible={addtaskmodel}>
                <View style={{backgroundColor:"#000000aa",flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View style={{backgroundColor:"#ffffff",flexDirection:'column',flex:1,marginLeft:50,marginRight:50}}>
                    <View>
                    <Text style={{color:"#FF003E",fontWeight:'bold',fontSize:30,marginLeft:40,marginBottom:10,marginTop:10,}}>Add Task Name</Text>
               
               <TextInput style={{ borderBottomWidth:2,borderBottomColor:"#FF003E",height:30,fontSize:25,marginBottom:5,color:'#FF003E',marginLeft:20,marginRight:20}}
                  value={newtaskname}
                  onChangeText={(t)=>setnewtaskname(t)}
               />
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,borderRadius:100}}onPress={addtask}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,marginTop:0,borderRadius:100}}onPress={()=>setaddtaskmodel(false)}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        <SafeAreaView>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity style={{marginRight:10}} onPress={()=>navigation.goBack()}>
                    <Image source={require('../assets/go_back.png')} style={{width:45, resizeMode:'contain', marginLeft:10}}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={{color:'white',fontSize:40,marginRight:10}}>
                    {route.params.taskname}
                </Text>
                    </View>
                    
                </View>
        </SafeAreaView>
        <View>
            <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your Tasks</Text>
        </View>
        <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,paddingBottom:75}}>
            <Text style={{color:"#FF003E",textAlign:'center',fontSize:40}}>Incomplete</Text>
            {
                tasksfound==false?
                <Text style={{textAlign:'center',marginTop:10,fontSize:20}}>Not found</Text>
                :
                tasklist.map((task)=>{
                    if(task[1]=="incomplete"){
                    return(
                        <View style={styles.task_view}>
                            <Text style={styles.task_view_title}>{task[0]}</Text>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <TouchableOpacity onPress={tocomplete(task[0])}>
                                <Image source={require('../assets/done.png')} style={{width:45, resizeMode:'contain', marginLeft:50}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deletetask(task[0])}>
                                <Image source={require('../assets/delete.png')} style={{width:45, resizeMode:'contain',}}/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={editclicked(task[0])}>
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
                <Text style={{textAlign:'center',marginTop:10,fontSize:20}}>Not found</Text>
                :
                tasklist.map((task)=>{
                    if(task[1]=="complete"){
                    return(
                        <View  style={styles.task_view}>
                            <Text style={styles.task_view_title}>{task[0]}</Text>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={toincomplete(task[0])}>
                                <Image source={require('../assets/close.png')} style={{width:45, resizeMode:'contain',marginLeft:50}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deletetask(task[0])}>
                                <Image source={require('../assets/delete.png')} style={{width:45, resizeMode:'contain',}}/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={editclicked(task[0])}>
                                <Image source={require('../assets/edit.png')} style={{width:45, resizeMode:'contain',marginRight:50}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                })
            }
        </ScrollView>
        <TouchableOpacity style={{backgroundColor:"#FF003E",position:'absolute',bottom:0,right:0,width:75,height:75,flex:1,flexDirection:'row',alignItems:'center',borderTopLeftRadius:25}} onPress={()=>setaddtaskmodel(true)}>
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