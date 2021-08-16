import React, { useContext } from 'react';

import { navigationPage } from '@app/types/types';
import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';

const Navigation = () => {
  const { setNavPage } = useContext(NavigationContext);

  return (
    <ul>
      <li onClick={() => setNavPage(navigationPage.PRODUCTS)}>Products</li>
      <li onClick={() => setNavPage(navigationPage.FAVORITES)}>Favorites</li>
      <li onClick={() => setNavPage(navigationPage.CART)}>Cart</li>
    </ul>
  );
};

export default Navigation;
