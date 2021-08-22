import React from 'react';
import { useState } from 'react';

import { ProductType, CartProductType } from '@app/types/types';

export const CartContext = React.createContext<{
  cartProducts: CartProductType[];
  setCartProducts: (cartProducts: CartProductType[]) => void;
  addToCart: (product: ProductType, amount: number) => void;
  removeFromCart: (cartProduct: CartProductType) => void;
  handleIncrement: (cartProduct: CartProductType, amount: number) => void;
  emptyCart: () => void;
  total: number;
  setTotal: () => void;
}>({
  cartProducts: [],
  setCartProducts: (products) => products,
  addToCart: (product, amount) => {},
  removeFromCart: (): CartProductType[] => [],
  handleIncrement: (cartProduct, amount) => {},
  emptyCart: () => {},
  total: 0,
  setTotal: () => {}
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product: ProductType, amount: number) => {
    const neWItem =
      !cartProducts.some((item) => item.id === product.id) ||
      cartProducts.length === 0;

    const result = () => {
      return cartProducts.map((item) => {
        if (item.cartAmount && item.cartAmount < item.stock) {
          return {
            ...item,
            cartAmount: item.cartAmount ? item.cartAmount + amount : amount
          };
        } else {
          return {
            ...item,
            cartAmount: item.cartAmount
          };
        }
      });
    };

    setCartProducts(
      neWItem ? [...cartProducts, { ...product, cartAmount: amount }] : result()
    );
  };

  const removeFromCart = (cartProduct: ProductType) => {
    const result = cartProducts.filter(
      (removeProduct) => cartProduct.id !== removeProduct.id
    );
    setCartProducts(result);
  };

  const handleIncrement = (cartProduct: CartProductType, amount: number) => {
    const result = () => {
      if (amount > 0) {
        return cartProducts.map((item) => {
          if (item.id !== cartProduct.id) {
            return item;
          }

          return {
            ...item,
            cartAmount: amount < cartProduct.stock ? amount : cartProduct.stock
          };
        });
      } else {
        return cartProducts.filter((item) => item.id !== cartProduct.id);
      }
    };

    setCartProducts(result());
  };

  const emptyCart = () => {
    setCartProducts([]);
  };

  const handleTotal = () => {
    const result = cartProducts.reduce(
      (total, cartProduct) =>
        total +
        (cartProduct.cartAmount
          ? cartProduct.price * cartProduct.cartAmount
          : cartProduct.price),
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
        handleIncrement,
        emptyCart,
        total,
        setTotal: handleTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
