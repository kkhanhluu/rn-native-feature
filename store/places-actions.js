import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      console.log('dmm', location);

      const geoCodingResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.long},${location.lat}.json?access_token=pk.eyJ1Ijoia2toYW5obHV1IiwiYSI6ImNqejF2cnpjZzBwYmIzZGxvMnl0ZGcxM2UifQ.9CODXiqDDccpSiexvQ6WCg`
      );
      const geoCoding = await geoCodingResponse.json();
      const address = geoCoding.features[0].place_name;

      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.long
      );
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (e) {
      throw e;
    }
  };
};
