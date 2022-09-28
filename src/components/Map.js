import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from '@timwangdev/react-native-geocoder';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Map = () => {
  const [origin, setOrigin] = useState({
    latitude: 41.012254795174314,
    longitude: 28.973596780078655,
  });
  const [countryCode, setCountryCode] = useState('TR');
  const navigation = useNavigation();

  const countryCodeFetch = async () => {
    const NY = {
      lat: origin.latitude,
      lng: origin.longitude,
    };
    const code = await Geocoder.geocodePosition(NY);
    setCountryCode(code[0].countryCode);
  };

  useEffect(() => {
    countryCodeFetch();
  }, [origin]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 15.1922,
        longitudeDelta: 15.1421,
      }}>
      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Videos', {
            latitude: origin.latitude,
            longitude: origin.longitude,
            countryCode: countryCode,
          })
        }>
        <Text style={styles.text}>Listele</Text>
      </Pressable>
    



      <Marker
        title="Bu Konumdasiniz"
        draggable
        onDragEnd={direction => setOrigin(direction.nativeEvent.coordinate)}
        coordinate={origin}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    width: 150,
    paddingHorizontal: 32,
    borderRadius: 5,
    top: '85%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',

  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default Map;
