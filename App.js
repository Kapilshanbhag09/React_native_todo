import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import Login from './Components/Login'
import Signup from './Components/Signup'

export default function App() {
  const login_username=AsyncStorage.getItem('login_username')
       if(login_username== null){
         console.log("not found")
       }
  return (
    <View style={styles.container}>
     <Signup/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
   
  },
});
