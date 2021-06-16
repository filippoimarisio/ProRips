import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');
  const [watcher, setWatcher] = useState()

  async function startTracking() {
    Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeInterval: 3000,
      distanceInterval: 1
    }, (newLocation) => setLocation(newLocation))
    .then((locationWatcher) => {
      setWatcher(locationWatcher as any);
    }).catch((err) => {
      setErrorMsg(err);
    })
  }

  async function stopTracking() {
    (watcher as any).remove()
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      startTracking()
      return() => stopTracking()
    })();
  }, []);


  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider="google"
        mapType="satellite"
        region={{
          latitude: location? location.coords.latitude : 52.3676,
          longitude: location? location.coords.longitude: 4.9041,
          latitudeDelta: location? 0.0000: 50,
          longitudeDelta: location? 0.0000: 50,
        }}
      ><Marker
          coordinate={{
            latitude: location? location.coords.latitude:52.3676,
            longitude: location? location.coords.longitude:4.9041
          }}
        />
      </MapView>
      
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})
