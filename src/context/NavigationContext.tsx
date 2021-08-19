import React from 'react';
import { useState } from 'react';

import { NavigationPage } from '@app/types/types';

export const NavigationContext = React.createContext<{
  navPage: NavigationPage;
  setNavPage: (navPage: NavigationPage) => void;
}>({
  navPage: NavigationPage.PRODUCTS,
  setNavPage: (navPage) => navPage
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [navPage, setNavPage] = useState(NavigationPage.PRODUCTS);

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
