import React, { useContext } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import classNames from 'clsx';

import { addFavorite, removeFavorite } from '@store/actions';

import { truncateText } from '@app/utils/utils';
import { Devices, ProductType } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext';
import { SideBarContext } from '@app/context/SideBarContext';
import { CartContext } from '@app/context/CartContext';
import { ReactComponent as FavoriteIcon } from '@app/assets/icons/icon-favorite.svg';

import Button from '@app/components/Button/Button';
import AmountCounter from '@app/components/Products/ProductItem/AmountCounter/AmountCounter';

import styles from './ProductItem.module.scss';

interface ProductItemInt {
  product: ProductType;
  isCartItem: boolean;
  onAddFavorite: (product: ProductType) => void;
  onRemoveFavorite: (product: ProductType) => void;
}

const ProductItem: React.FC<ProductItemInt> = ({
  isCartItem = false,
  product,
  product: {
    id,
    productName,
    productDescription,
    image_url,
    price,
    favorite,
    stock
  },
  onAddFavorite,
  onRemoveFavorite
}) => {
  const { deviceType } = useContext(DeviceContext);
  const { isSideBar } = useContext(SideBarContext);
  const { addToCart } = useContext(CartContext);

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
        [styles.productSidebar]: isSideBar || isCartItem
      })}
    >
      <picture
        className={classNames(styles.productImage, {
          [styles.productSidebarImage]: isSideBar || isCartItem
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
          [styles.productSidebarContent]: isSideBar || isCartItem
        })}
      >
        <h5
          className={classNames(styles.productContentTitle, {
            [styles.productSidebarContentTitle]: isSideBar || isCartItem
          })}
        >
          {productName}
        </h5>

        {deviceType === Devices.DESKTOP && !isSideBar && (
          <div className={styles.productContentDescription}>
            {truncateText(productDescription, 80)}
          </div>
        )}

        <div
          className={classNames(styles.productContentPrice, {
            [styles.productSidebarContentPrice]: isSideBar || isCartItem
          })}
        >
          <b>
            <span className={styles.productContentCurrency}>&#36;</span>
            {price}
          </b>
        </div>

        {isCartItem && <AmountCounter product={product} />}
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

      {!isSideBar && !isCartItem && (
        <div className={styles.productInfo}>
          {deviceType === Devices.DESKTOP && (
            <b className={styles.productInfoStock}>{stock} left</b>
          )}

          <Button actions={[() => addToCart(product)]} title="Add to cart">
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
