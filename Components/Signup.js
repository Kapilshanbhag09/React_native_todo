import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react'
const axios = require('axios');
import { View, Text,StyleSheet,Dimensions, TextInput,Image, SafeAreaView, Button, TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native'

export default function Signup({navigation}) {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [showpass,setshowpass]=useState(false)
    const sign_up_clicked=()=>{
        axios.get('http://ca41f4079b19.ngrok.io/signup/'+username+'/'+password)
          .then(function(res) {
              const resp=res.data;
              if(resp=="Username Exists"){
                Alert.alert(
                    "Username Already Exists",
                    "You have already signed up",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log(''),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                  );
              }
              if(resp=="User created"){
                  AsyncStorage.setItem('login_username',username,()=>{
                      AsyncStorage.setItem('login_password',password,()=>{
                        navigation.navigate('Home')
                        



                      })
                  })
              }
          })
          .catch(function (error) {
            console.log(JSON.stringify(error));
          })
    }
    return (
        <View>
            <View style={styles.upper_design}>{/*Upper Design */}
                <View style={styles.upper_design_circle_1}>
                <View style={styles.upper_design_circle_2}>

                    </View>

                </View>
               
                <SafeAreaView>
                <Image style={styles.todo_image_logo}source={require('../assets/todo_home_icon.png')}/>
                </SafeAreaView>
            </View>
            <View>
            <KeyboardAvoidingView style={styles.login_view}
             behavior={Platform.OS === "ios" ? "padding" : "height"}
            >{/*Login View */}
            <View style={{marginTop:-100}}>
                   <Text style={styles.login_label}>Username</Text>
               
                    <TextInput style={styles.login_inputfield}
                        value={username}
                        onChangeText={(t)=>setusername(t)}
                    />
               
                
                    <Text style={styles.login_label}>Password</Text>
               
                
                    <TextInput style={styles.login_inputfield}
                    value={password}
                    onChangeText={(t)=>setpassword(t)}
                    secureTextEntry={!showpass}
                    />
                    
                    
                    <View style={{marginLeft:40,flexDirection:'column',alignItems:'center'}}>
                       <TouchableOpacity style={styles.login_button} onPress={sign_up_clicked}>
                           <View style={{flexDirection:'column',alignItems:'center',width:"100%"}}>
                           <Text style={{textAlign:'center',fontSize:30,color:"#FF003E",fontWeight:'bold'}}>Sign Up</Text>
                           </View>
                       </TouchableOpacity>
                       </View>
                       
                    
               
                </View>
            </KeyboardAvoidingView>
            </View>
            <TouchableOpacity style={{position:'absolute',top:0,left:0}} onPress={()=>navigation.goBack()}  >
                <SafeAreaView>
                <Image style={{height:48, resizeMode:'contain',}} source={require('../assets/go_back.png')}/>
                </SafeAreaView>
            </TouchableOpacity>
          
        </View>
    );
}
const styles = StyleSheet.create({
    upper_design:{
        height:Dimensions.get('window').width/2,
        backgroundColor:"#FF003E",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    upper_design_circle_1:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width,
        backgroundColor:"white",
        borderRadius:Dimensions.get('window').width/2,
        marginLeft:-Dimensions.get('window').width/2,
        marginTop:-Dimensions.get('window').width/2,

    },
    upper_design_circle_2:{
        width:Dimensions.get('window').width-6,
        height:Dimensions.get('window').width-6,
        backgroundColor:"#FF1950",
        borderRadius:Dimensions.get('window').width/2,

    },
    todo_image_logo:{
        marginRight:15,
        resizeMode:'contain',
        height:'80%',
        },  

    login_view:{
        height:Dimensions.get('window').height-(Dimensions.get('window').width/2),
        //-Dimensions.get('window').width/2,
        backgroundColor:"#FF003E",
        flexDirection:'row',
        alignItems:"center",
        //-Dimensions.get('window').width/2,
    },
    login_label:{
        color:"white",
        fontWeight:'bold',
        fontSize:30,
        marginLeft:40,
        marginBottom:10,
        marginTop:10,
 },
    login_inputfield:{
        borderBottomWidth:2,
        borderBottomColor:"white",
        marginLeft:40,
        width:Dimensions.get('window').width-80,
        height:30,
        fontSize:25,
        marginBottom:5,
        color:'white'

    },
    login_button:{
      
        backgroundColor:'white',
        width:200,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:1000,
        height:50,
        marginTop:20
    },
    signup_button:{
      
        backgroundColor:'white',
        width:150,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:1000,
        height:45,
        marginTop:20
    }


    
});
