import React, { useContext } from 'react';

import classNames from 'clsx';

import { SideBarContext } from '@app/context/SideBarContext';

import styles from './ProductsList.module.scss';

interface ProductsListInt {
  header: React.ReactNode;
  footer?: React.ReactNode;
}

const ProductsList: React.FC<ProductsListInt> = ({
  header,
  children,
  footer
}) => {
  const { isSideBar } = useContext(SideBarContext);

  return (
    <section
      className={classNames(styles.products, {
        [styles.productsSideBar]: isSideBar
      })}
    >
      {header}
      <div>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
};

export default ProductsList;
