import React from 'react';
import { useState } from 'react';

import { ProductType } from '@app/types/types';

export const CartContext = React.createContext<{
  cartProducts: ProductType[];
  setCartProducts: (products: ProductType[]) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  total: number;
  setTotal: () => void;
}>({
  cartProducts: [],
  setCartProducts: (products) => products,
  addToCart: (product): ProductType[] => [product],
  removeFromCart: (product): ProductType[] => [product],
  total: 0,
  setTotal: () => {}
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product: ProductType) => {
    setCartProducts([...cartProducts, product]);
  };

  const removeFromCart = (product: ProductType) => {
    const result = cartProducts.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    setCartProducts(result);
  };

  const handleTotal = () => {
    const result = cartProducts.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotal(result);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        total,
        setTotal: handleTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
