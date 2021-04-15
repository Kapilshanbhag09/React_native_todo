import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login'

export default function App() {
  return (
    <View style={styles.container}>
     <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
   
  },
});
