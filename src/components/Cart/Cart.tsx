import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import classNames from 'clsx';

import { checkingOut } from '@store/actions';

import { CartProductType, NavigationPage } from '@app/types/types';
import { CartContext } from '@app/context/CartContext';
import { SideBarContext } from '@app/context/SideBarContext';

import Heading from '@app/components/Heading/Heading';
import ProductList from '@app/components/Products/ProductsList/ProductsList';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';
import Button from '@app/components/Button/Button';

import styles from './Cart.module.scss';

const Cart: React.FC<{
  onCheckingOut: (cartProducts: CartProductType[]) => void;
}> = ({ onCheckingOut }) => {
  const { cartProducts: products, emptyCart, total, setTotal } = useContext(
    CartContext
  );
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
            actions={[() => onCheckingOut(products), () => emptyCart()]}
            title="Checkout"
            variant="fancy"
            className={styles.checkoutButton}
          >
            Make a payment
          </Button>
        </div>
      )}
    </ProductList>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onCheckingOut: (value: CartProductType[]) => dispatch(checkingOut(value))
  };
};

export default connect(undefined, mapDispatchToProps)(Cart);
