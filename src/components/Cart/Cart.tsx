import React, { useContext } from 'react';

import { CartContext } from '@app/context/CartContext';

import ProductItem from '../Products/ProductItem/ProductItem';

const Cart = () => {
  const { cartProducts: products } = useContext(CartContext);
  return (
    <>
      <h1>Cart List</h1>

      <section>
        <h1>{products.length}</h1>
        {products.length > 0 && (
          <ul>
            {products.map((productProps, index) => (
              <ProductItem key={index} {...productProps} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Cart;
