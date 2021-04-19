import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'

export default function App() {
  AsyncStorage.setItem('login_username',null)
  const [login_username,setlogin_username]=useState('')
  AsyncStorage.getItem('login_username').then((e)=>setlogin_username(e));
  return (
    <View style={styles.container}>
      {
        login_username==''?<Login/>:<Home/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
   
  },
});
