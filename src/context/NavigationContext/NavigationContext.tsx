import React from 'react';
import { useState } from 'react';

import { navigationPage } from '@app/types/types';
// import useFetch from '@app/hooks/useFetch';

export const NavigationContext = React.createContext<{
  navPage: navigationPage;
  setNavPage: (navPage: navigationPage) => void;
}>({
  navPage: navigationPage.PRODUCTS,
  setNavPage: (navPage) => navPage
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [navPage, setNavPage] = useState(navigationPage.PRODUCTS);
  // const { loading, data, error } = useFetch();

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
