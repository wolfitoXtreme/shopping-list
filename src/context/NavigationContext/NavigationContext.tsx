import React from 'react';
import { useState } from 'react';

export const NavigationContext = React.createContext<{
  currentPage: number;
  setCurrentPage: (x: number) => void;
}>({ currentPage: 1, setCurrentPage: (currentPage) => currentPage });

export const NavigationProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
