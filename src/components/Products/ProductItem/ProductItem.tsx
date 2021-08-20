import React, { useContext } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import classNames from 'clsx';

import { addFavorite, removeFavorite } from '@store/actions';

import { truncateText } from '@app/utils/utils';
import { Devices, ProductType } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext';
import { SideBarContext } from '@app/context/SideBarContext';
import { ReactComponent as FavoriteIcon } from '@app/assets/icons/icon-favorite.svg';

import Button from '@app/components/Button/Button';

import styles from './ProductItem.module.scss';

interface ProductItemInt extends ProductType {
  isCartItem: boolean;
  onAddFavorite: (product: ProductType) => void;
  onRemoveFavorite: (product: ProductType) => void;
}

const ProductItem: React.FC<ProductItemInt> = ({
  isCartItem = false,
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
  const { deviceType } = useContext(DeviceContext);
  const { isSideBar } = useContext(SideBarContext);

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
    <li
      className={classNames(styles.product, {
        [styles.productSidebar]: isSideBar
      })}
    >
      <picture
        className={classNames(styles.productImage, {
          [styles.productSidebarImage]: isSideBar
        })}
      >
        <img
          src={image_url}
          width="50"
          height="50"
          alt=""
          title={productName}
        />
      </picture>

      <div
        className={classNames(styles.productContent, {
          [styles.productSidebarContent]: isSideBar
        })}
      >
        <h5 className={styles.productContentTitle}>{productName}</h5>

        {deviceType === Devices.DESKTOP && !isSideBar && (
          <div className={styles.productContentDescription}>
            {truncateText(productDescription, 80)}
          </div>
        )}

        <div
          className={classNames(styles.productContentPrice, {
            [styles.productSidebarContentPrice]: isSideBar
          })}
        >
          <b>
            <span className={styles.productContentCurrency}>&#36;</span>
            {price}
          </b>
        </div>

        {isCartItem && (
          <div className={styles.amountControl}>
            <input
              type="text"
              value="1"
              onChange={() => console.log('changing...')}
            />
          </div>
        )}
      </div>

      {!isCartItem && (
        <Button
          actions={[
            () =>
              !isFavorite ? handleAddFavorite(id) : handleRemoveFavorite(id)
          ]}
          variant="icon"
          className={classNames(styles.productFavoriteButton, {
            [styles.productFavoriteButtonActive]: isFavorite,
            [styles.productSidebarFavoriteButton]: isSideBar
          })}
          title={!isFavorite ? 'Add to favorites' : 'Remove from favorites'}
        >
          <FavoriteIcon />
        </Button>
      )}

      {!isSideBar && (
        <div className={styles.productInfo}>
          {deviceType === Devices.DESKTOP && <b>{stock} left</b>}

          <Button
            actions={[() => console.log('adding to cart')]}
            title="Add to cart"
          >
            + add
          </Button>
        </div>
      )}
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
