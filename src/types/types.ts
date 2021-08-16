export type FontVariantType = {
  variant: string;
  variantName: string;
  variantWeight: string;
};

export interface FontInt {
  font: string;
  fontName: string;
  fontVariants: FontVariantType[];
}

export type PagesType = {
  totalPages?: number;
  currentPage: number;
  previousPage?: number;
};

export type ProductType = {
  id: number;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription;
  favorite: number;
};

export type ProductsListType = {
  products: ProductType[];
};

export interface ProductsStateType {
  productsReducer: {
    productsList: {
      products: ProductType[];
      pages: PagesType;
    };
  };
}

export interface FavoritesStateType {
  favoritesReducer: {
    favoritesList: {
      products: ProductType[];
      pages: PagesType;
    };
  };
}

export enum navigationPage {
  PRODUCTS = 'products',
  FAVORITES = 'favorites',
  CART = 'cart'
}
