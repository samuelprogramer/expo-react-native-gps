import Geolocation from '@react-native-community/geolocation';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import GeoLocationLocal from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default function App() {
  const [latitude, setLat] = useState(0);
  const [longitude, setLon] = useState(0);
  
  async function permicoesParaLocalizacao(){
    try {
      if(Platform.OS === 'ios'){
        await Geolocation.requestAuthorization();
      }else {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
          title: "Para continuar é necessário autorizar o uso da localização",
          message: "Sua localização será usada para mostrarmos no mapa",
          buttonNegative: "Negar",
          buttonPositive: "Permitir"
        });
      }
      
      pegarLocalizacaoAtual();
    } catch (err) {
      console.warn('erro Permissions: ' ,err);
    }
  }
  useEffect(()=>{
    permicoesParaLocalizacao()
  },[]);

  async function pegarLocalizacaoAtual(){
    GeoLocationLocal.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    },
    (error) => {
      console.log('erro ao pegar posições: ',error);
      return null;
    },
    {
      enableHighAccuracy: true, //  precisão
      timeout: 15000,
      maximumAge: 10000 // tempo para manter  armazenado local anterior em cache
    }
    )
  }
  if(latitude==0){
    return (
      <View style={styles.container}>
        <Text>Carregando GPS</Text>
        <StatusBar style="auto" />
      </View>
         
    );
  }else{
    return(
      <>
      <StatusBar style="auto" />
        <MapView
        style={{flex: 1}}
        showsUserLocation={true}
        region={{
          latitude: latitude, 
          longitude: longitude,
          latitudeDelta: 0.2122,
          longitudeDelta: 0.2121,
        }}>
        
      </MapView>
      </>
      );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
