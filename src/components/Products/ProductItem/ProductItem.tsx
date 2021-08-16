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
    <img src={image_url} width="50" height="50" alt="" />
  </li>
);

export default ProductItem;
