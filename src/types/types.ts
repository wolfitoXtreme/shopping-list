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
export interface ProductsStateType {
  productsReducer: { products: ProductType[] };
}

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
