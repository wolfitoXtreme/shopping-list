import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { listProducts, pagingProducts } from '@store/actions';

import { requestListing } from '@app/utils/request';
import {
  ProductsStateType,
  ProductType,
  PagesType,
  Request,
  ProductsInt
} from '@app/types/types';

import ListButton from '@app/components/ListButton/ListButton';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';

import { list } from './Products.module.scss';

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
    <>
      <h1>Products List</h1>
      <h4>previousPage: {previousPage}</h4>
      <h4>currentPage: {currentPage}</h4>
      <h4>totalPages: {totalPages}</h4>
      <h4>loading: {loading.toString()}</h4>

      <section>
        <ListButton pages={pages} moreResults={onPagingProducts} />
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
        <ListButton pages={pages} moreResults={onPagingProducts} />
      </section>
    </>
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
