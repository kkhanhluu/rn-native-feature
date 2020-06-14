import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initalState = {
  places: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id,
        action.payload.title,
        action.payload.image
      );
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    case SET_PLACES: {
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lng,
              pl.lat
            )
        ),
      };
    }
    default:
      return state;
  }
};
