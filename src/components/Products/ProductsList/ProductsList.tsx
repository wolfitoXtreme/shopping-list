import React, { useContext } from 'react';

import classNames from 'clsx';

import { SideBarContext } from '@app/context/SideBarContext';

import styles from './ProductsList.module.scss';

const ProductsList: React.FC = ({ children }) => {
  const { isSideBar } = useContext(SideBarContext);

  return (
    <section
      className={classNames(styles.products, {
        [styles.productsSideBar]: isSideBar
      })}
    >
      {children}
    </section>
  );
};

export default ProductsList;
