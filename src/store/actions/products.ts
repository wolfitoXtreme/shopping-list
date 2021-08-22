import { ProductType, PagesType, CartProductType } from '@app/types/types';

import * as actions from './actions';

export const listProducts = (value: ProductType[]) => {
  return {
    type: actions.PRODUCTS_LISTING,
    value: value
  };
};

export const pagingProducts = (value: PagesType) => {
  return {
    type: actions.PRODUCTS_PAGING,
    value: value
  };
};

export const listFavorites = (value: ProductType[]) => {
  return {
    type: actions.FAVORITES_LISTING,
    value: value
  };
};

export const pagingFavorites = (value: PagesType) => {
  return {
    type: actions.FAVORITES_PAGING,
    value: value
  };
};

export const addFavorite = (value: ProductType) => {
  return {
    type: actions.PRODUCTS_ADD_FAVORITE,
    value: value
  };
};

export const removeFavorite = (value: ProductType) => {
  return {
    type: actions.PRODUCTS_REMOVE_FAVORITE,
    value: value
  };
};

export const checkingOut = (value: CartProductType[]) => {
  return {
    type: actions.CHECKING_OUT,
    value: value
  };
};
