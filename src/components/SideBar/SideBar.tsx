import React, { useContext, useEffect } from 'react';

import { SideBarContext } from '@app/context/SideBarContext';

const SideBar: React.FC = ({ children }) => {
  const { setIsSideBar } = useContext(SideBarContext);

  useEffect(() => {
    setIsSideBar(true);
  }, [setIsSideBar]);

  return <>{children}</>;
};

export default SideBar;
