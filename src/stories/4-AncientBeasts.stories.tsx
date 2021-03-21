import React from 'react';

import { AncientBeastsSeed0 } from '../series/ancient-beasts';
import { useWindowSize } from '../utilities/useWindowSize';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'AncientBeasts',
  component: AncientBeastsSeed0,
};

export const Seed0 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <AncientBeastsSeed0 width={constrainedWidth} height={constrainedHeight} />;
};
