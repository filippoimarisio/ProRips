import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import * as Location from 'expo-location';
import {getDistance, getPreciseDistance} from 'geolib';
import { MapLocation, DiscLocation } from '../types/types'
import { useAppSelector, useAppDispatch } from '../hooks'
import { addDiscLocation } from '../slices/discsLocationSlice'

export default function App() {

  // Local State
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');
  const [watcher, setWatcher] = useState()
  const [startLocation, setStartLocation] = useState<MapLocation|undefined>(undefined)
  const [endLocation, setEndLocation] = useState<MapLocation|undefined>(undefined)


  // App State methods
  const discsLocation = useAppSelector((state) => state.discsLocation)
  const dispatch = useAppDispatch()

  // Helper functions
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


  const setDiscLocation = (location: MapLocation) => {
    dispatch(addDiscLocation({
      latitude:location.latitude, 
      longitude:location.longitude, 
      id: getNextId(discsLocation),
      distanceFromBasket: endLocation? getDistance({latitude: location.latitude, longitude: location.longitude}, endLocation): 0,
      distanceFromTee: startLocation? getDistance({latitude: location.latitude, longitude: location.longitude}, startLocation): 0
    }))
  }

  const onSetLimitLocation = (isStart: boolean) => {
    if (location) {
      if (isStart) setStartLocation({latitude:location.coords.latitude, longitude:location.coords.longitude})
      else setEndLocation({latitude:location.coords.latitude, longitude:location.coords.longitude})
    }
  }

  const getNextId = (discs: DiscLocation[]) => {
    if (discs.length>0) return JSON.parse(JSON.stringify(discs)).sort((a: DiscLocation,b: DiscLocation)=>b.id - a.id)[0].id + 1
    else return 0
  }

  const displayStartMarker = () => {
    if (startLocation) return (
      <Marker
        coordinate={{
          latitude: startLocation.latitude,
          longitude: startLocation.longitude
        }}
      >
        <View>
          <Image
            source={require('../assets/marker_tee.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </Marker>
    )
  }

  const displayEndMarker = () => {
   if (endLocation) return (
      <Marker
        coordinate={{
          latitude: endLocation.latitude,
          longitude: endLocation.longitude
        }}
      >
        <View>
          <Image
            source={require('../assets/marker_basket.png')}
            style={{ width: 50, height: 50 }}
          />
          { startLocation && endLocation && <Text style={styles.mapLabel}>{getDistance(startLocation, endLocation)}m from start</Text>}
        </View>
      </Marker>
    )
  }

  const displayDiscsLocation = () => {
    return discsLocation.map(disc=> {
      return (
        <Marker
          key={disc.id}
          coordinate={{
            latitude: disc.latitude,
            longitude: disc.longitude
          }}
        >
          <View>
            <Image
              source={require('../assets/marker_disc.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.mapLabel}>{disc.distanceFromBasket}m</Text>
          </View> 
        </Marker>
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.setButtons}>
      <TouchableOpacity
          style={{...styles.button, backgroundColor: "rgba(255, 99, 71, 0.8)",}}
          onPress={()=> location? setDiscLocation({latitude:location.coords.latitude, longitude:location.coords.longitude}): null}
        >
          <Image source={require('../assets/marker_disc.png')} resizeMode='contain' style={{flex:2 }}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>onSetLimitLocation(true)}
        >
          <Image source={require('../assets/marker_tee.png')} resizeMode='contain' style={{flex:2 }}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> onSetLimitLocation(false)}
        >
          <Image source={require('../assets/marker_basket.png')} resizeMode='contain' style={{flex:2 }}/>
        </TouchableOpacity>
      </View>
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
        onLongPress={(e)=> setDiscLocation(e.nativeEvent.coordinate)}
      >
        { startLocation && displayStartMarker() }
        { endLocation && displayEndMarker() }
        { discsLocation && displayDiscsLocation()}

        <Marker
          coordinate={{
            latitude: location? location.coords.latitude:52.3676,
            longitude: location? location.coords.longitude:4.9041
          }}
          pinColor={'blue'}
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
    justifyContent: 'flex-end',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(245,245,245, 0.5)",
    padding: 8,
    zIndex: 1,
    borderRadius: 30,
    marginBottom: 20,
    height: 60,
    width: 60
  },
  setButtons: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'absolute',
    right: 30,
    bottom: 120
  },
  mapLabel: {
    color: 'white'
  }
})
