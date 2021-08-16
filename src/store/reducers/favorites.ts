import * as storeActions from '@store/actions/actions';

import { ProductType, PagesType } from '@app/types/types';

const initialState: {
  favoritesList: { products: ProductType[]; pages: PagesType };
} = {
  favoritesList: {
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
  const listFavorites = () => {
    return {
      ...state,
      favoritesList: {
        ...state.favoritesList,
        products: state.favoritesList.products.concat(action.value)
      }
    };
  };

  const pagingFavorites = () => {
    return {
      ...state,
      favoritesList: {
        ...state.favoritesList,
        pages: action.value
      }
    };
  };

  const runAction = {
    [storeActions.FAVORITES_LISTING]: listFavorites,
    [storeActions.FAVORITES_PAGING]: pagingFavorites
  };

  if (typeof runAction[action.type] === 'function') {
    return runAction[action.type]();
  }

  return state;
};

export default reducer;
