import React, { useContext, useState } from 'react';

import { ProductType } from '@app/types/types';
import { CartContext } from '@app/context/CartContext';
import { ReactComponent as PlusIcon } from '@app/assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '@app/assets/icons/icon-minus.svg';

import Button from '@app/components/Button/Button';

import styles from './AmountCounter.module.scss';

const AmountCounter: React.FC<{
  product: ProductType;
}> = ({ product }) => {
  const { removeFromCart } = useContext(CartContext);
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
    if (count <= 1) {
      removeFromCart(product);
      return;
    }
  };

  return (
    <div className={styles.amountControl}>
      <Button
        actions={[() => handleDecrease()]}
        variant="icon"
        className={styles.handlerButton}
        title={'Remove'}
      >
        <MinusIcon />
      </Button>

      <input type="text" value={count} readOnly onChange={() => {}} />

      <Button
        actions={[() => handleIncrease()]}
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
