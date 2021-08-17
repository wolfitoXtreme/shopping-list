import React from 'react';
import { useState } from 'react';

import { navigationPage } from '@app/types/types';

export const NavigationContext = React.createContext<{
  navPage: navigationPage;
  setNavPage: (navPage: navigationPage) => void;
}>({
  navPage: navigationPage.PRODUCTS,
  setNavPage: (navPage) => navPage
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [navPage, setNavPage] = useState(navigationPage.PRODUCTS);

  return (
    <NavigationContext.Provider
      value={{
        navPage,
        setNavPage
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
