import { ProductType, PagesType } from '@app/types/types';

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
