import axios from 'axios';

import { PagesType, ProductType, Request } from '../types/types';

const getTotalPages = (serverTotalItems: any, limit: number) =>
  Math.ceil(serverTotalItems / limit);

interface requestListingInt {
  requestType: Request;
  currentPage: number;
  limit?: number;
  onListingProducts: (x: ProductType[]) => void;
  onPagingProducts: (x: PagesType) => void;
  setError: (x: any) => void;
  setLoading: (x: boolean) => void;
}

export const requestListing = ({
  requestType,
  currentPage,
  limit,
  onListingProducts,
  onPagingProducts,
  setError,
  setLoading
}: requestListingInt) => {
  setLoading(true);

  const requestParams =
    requestType === Request.LIST_PRODUCTS
      ? `?_page=${currentPage}&_limit=${limit as number}`
      : '?favorite=1';

  axios(`/server/grocery/${requestParams}`)
    .then((response) => {
      onListingProducts(response.data);
      onPagingProducts({
        totalPages:
          requestType === Request.LIST_PRODUCTS
            ? getTotalPages(response.headers['x-total-count'], limit as number)
            : currentPage,
        currentPage: currentPage,
        previousPage: currentPage
      });
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => setLoading(false));
};
