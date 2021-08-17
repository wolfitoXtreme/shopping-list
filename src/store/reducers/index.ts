import { combineReducers } from 'redux';

import products from './products';
import favorites from './favorites';

export const RootReducer = combineReducers({
  products,
  favorites
});
