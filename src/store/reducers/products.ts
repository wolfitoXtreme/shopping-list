import * as storeActions from '@store/actions/actions';

import { ProductType, ProductsListType } from '@app/types/types';

const initialState: ProductsListType = {
  products: []
};

const reducer = (
  state = initialState,
  action: { type: string; value: ProductType[] }
) => {
  const listProducts = () => {
    return {
      ...state,
      products: state.products.concat(action.value)
    };
  };

  const runAction = {
    [storeActions.LIST_PRODUCTS]: listProducts
  };

  if (typeof runAction[action.type] === 'function') {
    return runAction[action.type]();
  }

  return state;
};

export default reducer;
