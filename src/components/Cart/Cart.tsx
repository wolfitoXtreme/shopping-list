import React, { useContext } from 'react';

import { CartContext } from '@app/context/CartContext';

import ProductItem from '../Products/ProductItem/ProductItem';

import { list } from './Cart.module.scss';

const Cart = () => {
  const { cartProducts: products } = useContext(CartContext);
  return (
    <>
      <h1>Cart List</h1>

      <section>
        <h1>{products.length}</h1>
        {products.length > 0 && (
          <ul className={list}>
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
