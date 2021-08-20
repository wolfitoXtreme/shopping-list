import React, { useContext, useEffect } from 'react';

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
  const { cartProducts: products, total, setTotal } = useContext(CartContext);
  const { isSideBar } = useContext(SideBarContext);

  useEffect(() => {
    setTotal();
  }, [setTotal]);

  return (
    <ProductList>
      <Heading navBackwards={NavigationPage.FAVORITES}>Cart</Heading>

      {products.length > 0 ? (
        <ul
          className={classNames(styles.list, {
            [styles.listSideBar]: isSideBar
          })}
        >
          {products.map((product, index) => (
            <ProductItem key={index} product={product} isCartItem />
          ))}
        </ul>
      ) : (
        <p>Your Cart is empty...</p>
      )}

      {products.length > 0 && (
        <div className={styles.info}>
          <p className={styles.total}>
            Total amount
            <b>
              <span>&#36;</span>
              {total}
            </b>
          </p>
          <Button
            actions={[() => console.log('Checking out...')]}
            title="Checkoutt"
            variant="button"
            className={styles.checkoutButton}
          >
            Make a payment
          </Button>
        </div>
      )}
    </ProductList>
  );
};

export default Cart;
