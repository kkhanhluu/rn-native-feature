import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickedLocation');
  console.log(mapPickedLocation);
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      props.onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permission!',
        'Yoy need to grant location permission for this app',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    try {
      const permission = await verifyPermissions();
      if (!permission) {
        return;
      }

      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
      props.onLocationPicked(mapPickedLocation);

      setIsFetching(false);
    } catch (e) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map',
        [{ text: 'Okay' }]
      );
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        <View style={styles.mapPreview}>
          {isFetching ? (
            <ActivityIndicator size={'large'} color={Colors.primary} />
          ) : (
            <Text>No Location chosen yet!</Text>
          )}
        </View>
      </MapPreview>

      <View style={styles.actions}>
        <Button
          title='Get user location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />

        <Button
          title='Pick on map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 15,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPicker;
