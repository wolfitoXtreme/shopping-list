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
      id: 'cce0f9b9-a830-4100-86b1-f73d1165c1d7',
      image_url:
        'https://images.pexels.com/photos/8743923/pexels-photo-8743923.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      stock: 21,
      productName: 'Licensed Frozen Computer',
      price: 28,
      productDescription:
        'Quam aperiam cumque qui pariatur. Eos consequatur modi qui numquam nemo culpa. Ut nam optio et consequatur nihil voluptatum est excepturi. Veritatis ratione et est. Iure dolor nobis quo. Sequi asperiores aut qui in dolorem.',
      favorite: 0
    },
    {
      id: '73b0bab3-7b57-4856-96af-ae4af1e39f4b',
      image_url:
        'https://images.pexels.com/photos/4354698/pexels-photo-4354698.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      stock: 49,
      productName: 'Gorgeous Granite Table',
      price: 34,
      productDescription:
        'Est sunt ut et nihil unde provident. Non non et saepe animi suscipit inventore. Blanditiis et quas. Id architecto porro sapiente ut non dolor omnis soluta. Eveniet sed consequuntur consectetur.',
      favorite: 0
    },
    {
      id: '2bf3f4da-4d88-45f5-a5c9-d9d15295a4e9',
      image_url:
        'https://images.pexels.com/photos/4621606/pexels-photo-4621606.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      stock: 36,
      productName: 'Licensed Steel Bacon',
      price: 9,
      productDescription:
        'Impedit dolorem qui. Velit placeat nostrum ab laudantium qui consequuntur quos. Voluptatem velit ad. Fugiat numquam debitis debitis voluptatum. Debitis dolores sapiente quis eaque.',
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
