import React, { useState } from 'react';

export const SideBarContext = React.createContext<{
  isSideBar: boolean;
  setIsSideBar: (x: boolean) => void;
}>({
  isSideBar: false,
  setIsSideBar: () => {}
});

export const SideBarProvider: React.FC = ({ children }) => {
  const [isSideBar, setIsSideBar] = useState(false);

  return (
    <SideBarContext.Provider value={{ isSideBar, setIsSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};
