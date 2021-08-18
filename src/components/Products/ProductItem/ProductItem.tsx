import React from 'react';

import { ProductType } from '@app/types/types';

import styles from './ProductItem.module.scss';

const ProductItem: React.FC<ProductType> = ({
  id,
  productName,
  productDescription,
  image_url,
  price,
  favorite,
  stock
}) => (
  <li className={styles.product}>
    <picture className={styles.productImage}>
      <img src={image_url} width="50" height="50" alt="" title={productName} />
    </picture>
    <div className={styles.productContent}>
      <h5 className={styles.productContentTitle}>{productName}</h5>
      <div>{productDescription}</div>
      <div className={styles.productContentPrice}>
        <b>&#36;{price}</b>
      </div>
    </div>
    <div className={styles.productInfo}>
      <b>{stock} left</b>
      <button>add</button>
    </div>
  </li>
);

export default ProductItem;
