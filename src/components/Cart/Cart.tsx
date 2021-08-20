import React, { useContext } from 'react';

import classNames from 'clsx';

import { NavigationPage } from '@app/types/types';
import { CartContext } from '@app/context/CartContext';
import { SideBarContext } from '@app/context/SideBarContext';

import Heading from '@app/components/Heading/Heading';
import ProductList from '@app/components/Products/ProductsList/ProductsList';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';
import Button from '@app/components/Button/Button';

import styles from './Cart.module.scss';

const Cart: React.FC<{}> = () => {
  const { cartProducts: products } = useContext(CartContext);
  const { isSideBar } = useContext(SideBarContext);

  return (
    <ProductList>
      <Heading navBackwards={NavigationPage.FAVORITES}>Cart</Heading>

      {products.length > 0 && (
        <ul
          className={classNames(styles.list, {
            [styles.listSideBar]: isSideBar
          })}
        >
          {products.map((productProps, index) => (
            <ProductItem key={index} isCartItem {...productProps} />
          ))}
        </ul>
      )}

      <p>
        Total amount
        <b>
          <span>&#36;</span>0.00
        </b>
      </p>
      <Button
        actions={[() => console.log('Checking out...')]}
        title="Checkoutt"
      >
        Make a payment
      </Button>
    </ProductList>
  );
};

export default Cart;
