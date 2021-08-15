import { ProductType } from '@app/types/types';

import * as actions from './actions';

export const listProducts = (value: ProductType[]) => {
  return {
    type: actions.LIST_PRODUCTS,
    value: value
  };
};
