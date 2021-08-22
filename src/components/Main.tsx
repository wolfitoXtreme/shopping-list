import React, { useContext } from 'react';

import classNames from 'clsx';

import { Devices, NavigationPage } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext';
import { NavigationContext } from '@app/context/NavigationContext';
import { SideBarProvider } from '@app/context/SideBarContext';

import Products from '@app/components/Products/Products';
import Favorites from '@app/components/Favorites/Favorites';
import Cart from '@app/components/Cart/Cart';
import SideBar from '@app/components/SideBar/SideBar';

import styles from './Main.module.scss';

const Main = () => {
  const { deviceType } = useContext(DeviceContext);
  const { navPage } = useContext(NavigationContext);

  return (
    <div className={styles.main}>
      <div
        className={classNames(styles.content, {
          [styles.contentDesktop]: deviceType === Devices.DESKTOP
        })}
      >
        {deviceType === Devices.MOBILE && (
          <>
            {navPage === NavigationPage.PRODUCTS && <Products />}
            {navPage === NavigationPage.FAVORITES && <Favorites />}
            {navPage === NavigationPage.CART && <Cart />}
          </>
        )}

        {deviceType === Devices.DESKTOP && (
          <>
            <Products />
            <SideBarProvider>
              <div className={styles.sideBar}>
                <SideBar>
                  {navPage === NavigationPage.PRODUCTS ||
                  navPage === NavigationPage.CART ? (
                    <Cart />
                  ) : null}
                  {navPage === NavigationPage.FAVORITES && <Favorites />}
                </SideBar>
              </div>
            </SideBarProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
