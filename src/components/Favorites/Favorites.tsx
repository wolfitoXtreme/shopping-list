import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { listFavorites, pagingFavorites } from '@store/actions';

import { FavoritesStateType, ProductType, PagesType } from '@app/types/types';

import ProductItem from '@app/components/Products/ProductItem/ProductItem';

import { list } from './Favorites.module.scss';

interface ProductsInt {
  products: ProductType[];
  pages: PagesType;
  onListingProducts: (products: ProductType[]) => void;
  onPagingProducts: (pages: PagesType) => void;
}

const Favorites: React.FC<ProductsInt> = ({
  products,
  pages,
  pages: { currentPage, totalPages, previousPage },
  onListingProducts,
  onPagingProducts
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const previousPageRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (currentPage === previousPage) {
      setLoading(false);
      return;
    }

    axios(`http://localhost:8000/grocery/?favorite=1`)
      .then((response) => {
        onListingProducts(response.data);
        onPagingProducts({
          totalPages: currentPage,
          currentPage: currentPage,
          previousPage: currentPage
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));

    previousPageRef.current = currentPage;
  }, [
    currentPage,
    onListingProducts,
    onPagingProducts,
    previousPage,
    totalPages
  ]);

  return (
    <>
      <h1>Favorites List</h1>
      <h4>previousPage: {previousPage}</h4>
      <h4>currentPage: {currentPage}</h4>
      <h4>totalPages: {totalPages}</h4>

      <section>
        <h1>{products.length}</h1>
        {products.length > 0 && (
          <ul className={list}>
            {products.map((productProps, index) => (
              <ProductItem key={index} {...productProps} />
            ))}
          </ul>
        )}
        {loading && !error && <p>loading...</p>}
        {error && (
          <p>
            Server must be down.
            <br />
            <b>{error}</b>
          </p>
        )}
      </section>
    </>
  );
};

const mapStateToProps = (state: FavoritesStateType) => {
  return {
    products: state.favorites.favoritesList.products,
    pages: state.favorites.favoritesList.pages
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onListingProducts: (value: ProductType[]) => dispatch(listFavorites(value)),
    onPagingProducts: (value: PagesType) => dispatch(pagingFavorites(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
