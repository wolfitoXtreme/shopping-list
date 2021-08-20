import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { listProducts, pagingProducts } from '@store/actions';

import { requestListing } from '@app/utils/request';
import {
  ProductsStateType,
  ProductType,
  PagesType,
  Request,
  ProductsInt,
  NavigationPage
} from '@app/types/types';

import Heading from '@app/components/Heading/Heading';
import ProductList from '@app/components/Products/ProductsList/ProductsList';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';
import ListButton from '@app/components/ListButton/ListButton';

import styles from './Products.module.scss';

const limit = 8;

const Products: React.FC<ProductsInt> = ({
  products,
  pages,
  pages: { currentPage, totalPages, previousPage },
  onListingProducts,
  onPagingProducts
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previousPageRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (currentPage === totalPages) setLoading(false);
    if (currentPage === previousPage) return;

    requestListing({
      requestType: Request.LIST_PRODUCTS,
      currentPage,
      limit,
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
    <ProductList>
      <Heading navForwards={NavigationPage.FAVORITES}>Products List</Heading>

      {products.length > 0 && (
        <ul className={styles.list}>
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
      <ListButton pages={pages} moreResults={onPagingProducts} />
    </ProductList>
  );
};

const mapStateToProps = (state: ProductsStateType) => {
  return {
    products: state.products.productsList.products,
    pages: state.products.productsList.pages
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onListingProducts: (value: ProductType[]) => dispatch(listProducts(value)),
    onPagingProducts: (value: PagesType) => dispatch(pagingProducts(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
