import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import classNames from 'clsx';

import { listFavorites, pagingFavorites } from '@store/actions';

import { requestListing } from '@app/utils/request';
import { SideBarContext } from '@app/context/SideBarContext';
import {
  ProductType,
  PagesType,
  Request,
  ProductsInt,
  ProductsStateType,
  NavigationPage
} from '@app/types/types';

import Heading from '@app/components/Heading/Heading';
import ProductList from '@app/components/Products/ProductsList/ProductsList';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';

import styles from './Favorites.module.scss';

const Favorites: React.FC<ProductsInt> = ({
  products,
  pages: { currentPage, totalPages, previousPage },
  onListingProducts,
  onPagingProducts
}) => {
  const { isSideBar } = useContext(SideBarContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const previousPageRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (currentPage === previousPage) {
      setLoading(false);
      return;
    }

    requestListing({
      requestType: Request.LIST_FAVORITES,
      currentPage,
      onListingProducts,
      onPagingProducts,
      setError,
      setLoading
    });

    previousPageRef.current = currentPage;
  }, [
    currentPage,
    onListingProducts,
    onPagingProducts,
    previousPage,
    totalPages
  ]);

  return (
    <ProductList
      header={
        <Heading
          navBackwards={NavigationPage.PRODUCTS}
          navForwards={NavigationPage.CART}
        >
          Favorites List
        </Heading>
      }
    >
      {products.length > 0 ? (
        <ul
          className={classNames(styles.list, {
            [styles.listSideBar]: isSideBar
          })}
        >
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </ul>
      ) : (
        <p>You have no favorites...</p>
      )}
      {loading && !error && <p>loading...</p>}
      {error && (
        <p>
          Server must be down.
          <br />
          <b>{error}</b>
        </p>
      )}
    </ProductList>
  );
};

const mapStateToProps = (state: ProductsStateType) => {
  return {
    products: state.products.favoritesList.products,
    pages: state.products.favoritesList.pages
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onListingProducts: (value: ProductType[]) => dispatch(listFavorites(value)),
    onPagingProducts: (value: PagesType) => dispatch(pagingFavorites(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
