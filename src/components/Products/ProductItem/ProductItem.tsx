import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import classNames from 'clsx';

import { addFavorite, removeFavorite } from '@store/actions';

import { truncateText } from '@app/utils/utils';
import { ProductType } from '@app/types/types';
import { ReactComponent as FavoriteIcon } from '@app/assets/icons/icon-favorite.svg';

import Button from '@app/components/Button/Button';

import styles from './ProductItem.module.scss';

interface ProductItemInt extends ProductType {
  onAddFavorite: (product: ProductType) => void;
  onRemoveFavorite: (product: ProductType) => void;
}

const ProductItem: React.FC<ProductItemInt> = ({
  id,
  productName,
  productDescription,
  image_url,
  price,
  favorite,
  stock,
  onAddFavorite,
  onRemoveFavorite
}) => {
  const isFavorite = Boolean(favorite);

  const handleAddFavorite = (id: string) => {
    axios
      .patch(`/server/grocery/${id}`, { favorite: 1 })
      .then((response) => {
        onAddFavorite(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRemoveFavorite = (id: string) => {
    axios
      .patch(`/server/grocery/${id}`, { favorite: 0 })
      .then((response) => {
        onRemoveFavorite(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <li className={styles.product}>
      <picture className={styles.productImage}>
        <img
          src={image_url}
          width="50"
          height="50"
          alt=""
          title={productName}
        />
      </picture>

      <div className={styles.productContent}>
        <h5 className={styles.productContentTitle}>{productName}</h5>
        <div className={styles.productContentDescription}>
          {truncateText(productDescription, 80)}
        </div>
        <div className={styles.productContentPrice}>
          <b>
            <span className={styles.productContentCurrency}>&#36;</span>
            {price}
          </b>
        </div>
      </div>

      <Button
        actions={[
          () => (!isFavorite ? handleAddFavorite(id) : handleRemoveFavorite(id))
        ]}
        variant="icon"
        className={classNames(styles.productFavoriteButton, {
          [styles.productFavoriteButtonActive]: isFavorite
        })}
        title={!isFavorite ? 'Add to favorites' : 'Remove from favorites'}
      >
        <FavoriteIcon />
      </Button>

      <div className={styles.productInfo}>
        <b>{stock} left</b>
        <Button
          actions={[() => console.log('adding to cart')]}
          title="Add to cart"
        >
          add
        </Button>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onAddFavorite: (value: ProductType) => dispatch(addFavorite(value)),
    onRemoveFavorite: (value: ProductType) => dispatch(removeFavorite(value))
  };
};

export default connect(undefined, mapDispatchToProps)(ProductItem);
