import React, { useContext } from 'react';

import { CartProductType } from '@app/types/types';
import { CartContext } from '@app/context/CartContext';
import { ReactComponent as PlusIcon } from '@app/assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '@app/assets/icons/icon-minus.svg';

import Button from '@app/components/Button/Button';

import styles from './AmountCounter.module.scss';

const AmountCounter: React.FC<{
  cartProduct: CartProductType;
}> = ({ cartProduct }) => {
  const { handleIncrement } = useContext(CartContext);

  return (
    <div className={styles.amountControl}>
      <Button
        actions={[
          () => {
            handleIncrement(
              cartProduct,
              (cartProduct.cartAmount as number) - 1
            );
          }
        ]}
        variant="icon"
        className={styles.handlerButton}
        title={'Remove'}
      >
        <MinusIcon />
      </Button>

      <input
        type="text"
        value={cartProduct.cartAmount}
        readOnly
        onChange={() => {}}
      />

      <Button
        actions={[
          () => {
            handleIncrement(
              cartProduct,
              (cartProduct.cartAmount as number) + 1
            );
          }
        ]}
        variant="icon"
        className={styles.handlerButton}
        title={'Add'}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
export default AmountCounter;
