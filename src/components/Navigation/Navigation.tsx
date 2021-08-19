import React, { useContext } from 'react';

import { NavigationPage } from '@app/types/types';
import { NavigationContext } from '@app/context/NavigationContext';

const Navigation = () => {
  const { setNavPage } = useContext(NavigationContext);

  return (
    <ul>
      <li onClick={() => setNavPage(NavigationPage.PRODUCTS)}>Products</li>
      <li onClick={() => setNavPage(NavigationPage.FAVORITES)}>Favorites</li>
      <li onClick={() => setNavPage(NavigationPage.CART)}>Cart</li>
    </ul>
  );
};

export default Navigation;
