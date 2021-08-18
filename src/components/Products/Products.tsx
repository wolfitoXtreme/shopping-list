import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { listProducts, pagingProducts } from '@store/actions';

import { ProductsStateType, ProductType, PagesType } from '@app/types/types';

import ListButton from '@app/components/ListButton/ListButton';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';

import { list } from './Products.module.scss';

const limit = 10;

interface ProductsInt {
  products: ProductType[];
  pages: PagesType;
  onListingProducts: (products: ProductType[]) => void;
  onPagingProducts: (pages: PagesType) => void;
}

const Products: React.FC<ProductsInt> = ({
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
    if (currentPage === totalPages) setLoading(false);
    if (currentPage === previousPage) return;

    axios(`http://localhost:8000/grocery/?_page=${currentPage}&_limit=${limit}`)
      .then((response) => {
        const serverTotalItems = response.headers['x-total-count'];
        const serverTotalPages = Math.ceil(serverTotalItems / limit);

        onListingProducts(response.data);
        onPagingProducts({
          totalPages: serverTotalPages,
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
      <h1>Products List</h1>
      <h4>previousPage: {previousPage}</h4>
      <h4>currentPage: {currentPage}</h4>
      <h4>totalPages: {totalPages}</h4>

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
