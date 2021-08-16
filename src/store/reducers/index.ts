import { combineReducers } from 'redux';

import productsReducer from './products';
import favoritesReducer from './favorites';

export const RootReducer = combineReducers({
  productsReducer,
  favoritesReducer
});
