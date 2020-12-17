import React from 'react';

import { WatercolorSedimentSeed0 } from '../series/watercolor-sediment';
import { useWindowSize } from '../utilities/useWindowSize';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'WatercolorSediment',
  component: WatercolorSedimentSeed0,
};

export const Seed0 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <WatercolorSedimentSeed0 width={constrainedWidth} height={constrainedHeight} />;
};
