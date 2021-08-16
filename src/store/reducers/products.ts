import * as storeActions from '@store/actions/actions';

import { ProductType, PagesType } from '@app/types/types';

const initialState: {
  productsList: { products: ProductType[]; pages: PagesType };
} = {
  productsList: {
    products: [],
    pages: {
      totalPages: undefined,
      currentPage: 1,
      previousPage: undefined
    }
  }
};

const reducer = (
  state = initialState,
  action: { type: string; value: any }
) => {
  const listProducts = () => {
    return {
      ...state,
      productsList: {
        ...state.productsList,
        products: state.productsList.products.concat(action.value)
      }
    };
  };

  const pagingProducts = () => {
    return {
      ...state,
      productsList: {
        ...state.productsList,
        pages: action.value
      }
    };
  };

  const runAction = {
    [storeActions.PRODUCTS_LISTING]: listProducts,
    [storeActions.PRODUCTS_PAGING]: pagingProducts
  };

  if (typeof runAction[action.type] === 'function') {
    return runAction[action.type]();
  }

  return state;
};

export default reducer;
