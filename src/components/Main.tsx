import React, { useContext } from 'react';

import { NavigationPage } from '@app/types/types';
import { NavigationContext } from '@app/context/NavigationContext';

import Products from '@app/components/Products/Products';
import Favorites from '@app/components/Favorites/Favorites';
import Navigation from '@app/components/Navigation/Navigation';
import Cart from '@app/components/Cart/Cart';

const Main = () => {
  const { navPage } = useContext(NavigationContext);

  return (
    <>
      <Navigation />
      {navPage === NavigationPage.PRODUCTS && <Products />}
      {navPage === NavigationPage.FAVORITES && <Favorites />}
      {navPage === NavigationPage.CART && <Cart />}
    </>
  );
};

export default Main;
