import Geolocation from '@react-native-community/geolocation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';

export default function App() {
  async function setPermitionLocation(){
    console.log("Requisitando permição para localização");
    try {
      if(Platform.OS === 'ios'){
         await Geolocation.requestAuthorization();
      }else {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
          title: "Para continuar é necessário autorizar o uso da localização",
          message:
          "Sua localização será usada para mostrarmos no mapa",
          buttonNegative: "Negar",
          buttonPositive: "Permitir"
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }
  useEffect(()=>{
    setPermitionLocation()
  },[]);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
