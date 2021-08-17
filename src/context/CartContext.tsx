import React from 'react';
import { useState } from 'react';

import { ProductType } from '@app/types/types';

export const CartContext = React.createContext<{
  cartProducts: ProductType[];
  setCartProducts: (products: ProductType[]) => void;
}>({
  cartProducts: [],
  setCartProducts: (products) => products
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([
    {
      id: 123,
      image_url: 'url',
      stock: 1,
      productName: 'init test product',
      price: 12,
      productDescription: 'sedcription',
      favorite: 1
    }
  ]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
