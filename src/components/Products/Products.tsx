import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import { listProducts } from '@store/actions';

import useFetch from '@app/hooks/useFetch';
import { ProductsStateType, ProductType } from '@app/types/types';
import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';

import ListButton from '@app/components/Products/ListButton/ListButton';
import ProductItem from '@app/components/Products/ProductItem/ProductItem';

const Products: React.FC<{
  products: ProductType[];
  onListingProducts: (...args: any[]) => void;
}> = ({ products: productsList, onListingProducts }) => {
  const { currentPage } = useContext(NavigationContext);
  const { loading, data, error } = useFetch(10);

  useEffect(() => {
    if (productsList.length <= 0) {
      onListingProducts(data);
    }
  }, [data, onListingProducts, productsList.length]);

  return (
    <>
      <h1>Ejected CRA Boilerplate - {currentPage}</h1>

      <section>
        <ListButton />

        {!loading && !error && (
          <ul>
            {productsList.map((productProps, index) => (
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
    products: state.productsReducer.products
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onListingProducts: (value) => dispatch(listProducts(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
