import React, { useContext } from 'react';

import classNames from 'clsx';

import { Devices, NavigationPage } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext';
import { NavigationContext } from '@app/context/NavigationContext';
import { SideBarContext } from '@app/context/SideBarContext';
import { ReactComponent as ArrowIcon } from '@app/assets/icons/icon-arrow.svg';

import Button from '@app/components/Button/Button';

import styles from './Heading.module.scss';

const Heading: React.FC<{
  navForwards?: NavigationPage;
  navBackwards?: NavigationPage;
}> = ({ children, navForwards, navBackwards }) => {
  const { deviceType } = useContext(DeviceContext);
  const { isSideBar } = useContext(SideBarContext);
  const { setNavPage, navPage } = useContext(NavigationContext);

  return (
    <div className={styles.heading}>
      <div>
        {navBackwards && deviceType === Devices.MOBILE && (
          <Button
            actions={[() => setNavPage(navBackwards)]}
            variant="icon"
            title={navBackwards}
            className={classNames(
              styles.navButtonIcon,
              styles.navButtonIconBackwards
            )}
          >
            <ArrowIcon />
          </Button>
        )}
      </div>

      <h2>{children}</h2>

      <div>
        {navForwards && deviceType === Devices.MOBILE && (
          <Button
            actions={[() => setNavPage(navForwards)]}
            variant="icon"
            title={navForwards}
            className={classNames(styles.navButtonIcon)}
          >
            <ArrowIcon />
          </Button>
        )}

        {deviceType === Devices.DESKTOP && !isSideBar && (
          <div className={styles.navDesktop}>
            {(navPage === NavigationPage.CART ||
              navPage === NavigationPage.PRODUCTS) && (
              <Button
                actions={[() => setNavPage(NavigationPage.FAVORITES)]}
                variant="icon"
                title={NavigationPage.FAVORITES}
                className={classNames(styles.navButtonIcon)}
              >
                <ArrowIcon />
              </Button>
            )}

            {navPage === NavigationPage.FAVORITES && (
              <Button
                actions={[() => setNavPage(NavigationPage.CART)]}
                variant="icon"
                title={NavigationPage.CART}
                className={classNames(styles.navButtonIcon)}
              >
                <ArrowIcon />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Heading;
