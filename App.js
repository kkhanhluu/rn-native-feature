import React from 'react';
import thunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';

import placeReducer from './store/places-reducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('initialized db');
  })
  .catch((err) => {
    console.log('initialize db failed');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
