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
      id: '366867c5-f453-485f-8e2a-33127f0bdc2b',
      image_url:
        'https://images.pexels.com/photos/7599097/pexels-photo-7599097.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      stock: 37,
      productName: 'Handmade Cotton Ball',
      price: 55,
      productDescription:
        'Ratione sunt quis fugiat occaecati enim. Asperiores aspernatur delectus eligendi corporis quam blanditiis quis. Laboriosam animi eius corporis vel laborum. Sed soluta impedit.',
      favorite: 0
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
