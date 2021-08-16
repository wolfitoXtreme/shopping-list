import { ProductType, PagesType } from '@app/types/types';

import * as actions from './actions';

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
