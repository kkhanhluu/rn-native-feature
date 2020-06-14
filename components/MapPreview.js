import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import ENV from '../env';
const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    console.log(props.location);
    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${props.location.long},${props.location.lat},12/400x200?access_token=pk.eyJ1Ijoia2toYW5obHV1IiwiYSI6ImNqejF2cnpjZzBwYmIzZGxvMnl0ZGcxM2UifQ.9CODXiqDDccpSiexvQ6WCg`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
});

export default MapPreview;
