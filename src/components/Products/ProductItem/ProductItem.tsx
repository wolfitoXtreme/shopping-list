import React from 'react';

import { ProductType } from '@app/types/types';

const ProductItem: React.FC<ProductType> = ({
  id,
  productName,
  productDescription,
  image_url,
  price,
  favorite,
  stock
}) => (
  <li>
    <h6>{productName}</h6>
  </li>
);

export default ProductItem;
