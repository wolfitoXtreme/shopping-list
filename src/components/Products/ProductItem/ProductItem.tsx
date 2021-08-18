import React from 'react';

import { truncateText } from '@app/utils/utils';
import { ProductType } from '@app/types/types';
import { ReactComponent as FavoriteIcon } from '@app/assets/icons/icon-favorite.svg';

import Button from '@app/components/Button/Button';

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
      <div className={styles.productContentDescription}>
        {truncateText(productDescription, 80)}
      </div>
      <div className={styles.productContentPrice}>
        <b>&#36;{price}</b>
      </div>
    </div>

    <Button
      actions={[() => console.log('adding to favorites')]}
      variant="icon"
      className={styles.productFavoriteButton}
    >
      <FavoriteIcon />
    </Button>

    <div className={styles.productInfo}>
      <b>{stock} left</b>
      <Button actions={[() => console.log('adding to cart')]}>add</Button>
    </div>
  </li>
);

export default ProductItem;
