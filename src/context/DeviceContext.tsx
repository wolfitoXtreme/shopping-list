import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Devices } from '@app/types/types';
import { SASSvarsToJason } from '@app/utils/utils';

import { breakpoints as SASSBreakpoints } from '@app/components/Main.module.scss';

export const device = {
  deviceType: Devices.MOBILE
};

const breakPoints = SASSvarsToJason(SASSBreakpoints);

export const DeviceContext = React.createContext<{
  deviceType: Devices;
}>(device);

const getDeviceType = (mediaQuery) =>
  mediaQuery ? Devices.MOBILE : Devices.DESKTOP;

export const DeviceProvider: React.FC = ({ children }) => {
  const matchMediaQuery = useMediaQuery({
    maxWidth: parseInt(breakPoints['large']) - 1 + 'px' // -1px, no overlap between breakpoints
  });

  const [deviceType, setDeviceType] = useState(getDeviceType(matchMediaQuery));

  useEffect(() => {
    setDeviceType(getDeviceType(matchMediaQuery));
  }, [matchMediaQuery]);

  return (
    <DeviceContext.Provider
      value={{
        deviceType
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
