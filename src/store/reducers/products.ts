import * as storeActions from '@store/actions/actions';

import { ProductType, PagesType, CartProductType } from '@app/types/types';

const initialState: {
  productsList: { products: ProductType[]; pages: PagesType };
  favoritesList: { products: ProductType[]; pages: PagesType };
} = {
  productsList: {
    products: [],
    pages: {
      totalPages: undefined,
      currentPage: 1,
      previousPage: undefined
    }
  },
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
  const listProducts = () => {
    return {
      ...state,
      productsList: {
        ...state.productsList,
        products: [...state.productsList.products, ...action.value]
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

  const listFavorites = () => {
    return {
      ...state,
      favoritesList: {
        ...state.favoritesList,
        products: [...action.value]
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

  const addFavorite = () => {
    const update = (products: ProductType[], itemToUpdate: ProductType) => {
      return products.map((item) => {
        if (item.id !== itemToUpdate.id) {
          return item;
        }

        return {
          ...item,
          ...itemToUpdate
        };
      });
    };

    return {
      ...state,
      productsList: {
        ...state.productsList,
        products: update(state.productsList.products, action.value)
      },
      favoritesList: {
        ...state.favoritesList,
        products: [...state.favoritesList.products, action.value]
      }
    };
  };

  const removeFavorite = () => {
    const update = (
      products: ProductType[],
      itemToUpdate: ProductType,
      list: string
    ) => {
      if (list === 'favorites') {
        return products.filter((item, index) => {
          if (item.id !== itemToUpdate.id) {
            return item.favorite !== itemToUpdate.favorite;
          }
          return undefined;
        });
      } else {
        return products.map((item, index) => {
          if (item.id !== itemToUpdate.id) {
            return item;
          }

          return {
            ...item,
            ...itemToUpdate
          };
        });
      }
    };

    return {
      ...state,
      productsList: {
        ...state.productsList,
        products: update(state.productsList.products, action.value, 'products')
      },
      favoritesList: {
        ...state.favoritesList,
        products: update(
          state.favoritesList.products,
          action.value,
          'favorites'
        )
      }
    };
  };

  const checkingOut = () => {
    const update = (
      products: ProductType[],
      cartProducts: CartProductType[]
    ) => {
      const result = products.map((item) => {
        const cartProduct = cartProducts.find(
          (cartItem) => cartItem.id === item.id
        );

        const updatedProduct = {
          ...item,
          stock: cartProduct?.cartAmount
            ? item.stock - cartProduct.cartAmount
            : item.stock
        };
        return cartProduct ? { ...item, ...updatedProduct } : item;
      });

      return result;
    };

    return {
      ...state,
      productsList: {
        ...state.productsList,
        products: update(state.productsList.products, action.value)
      }
    };
  };

  const runAction = {
    [storeActions.PRODUCTS_LISTING]: listProducts,
    [storeActions.PRODUCTS_PAGING]: pagingProducts,
    [storeActions.PRODUCTS_ADD_FAVORITE]: addFavorite,
    [storeActions.PRODUCTS_REMOVE_FAVORITE]: removeFavorite,
    [storeActions.FAVORITES_LISTING]: listFavorites,
    [storeActions.FAVORITES_PAGING]: pagingFavorites,
    [storeActions.CHECKING_OUT]: checkingOut
  };

  if (typeof runAction[action.type] === 'function') {
    return runAction[action.type]();
  }

  return state;
};

export default reducer;
