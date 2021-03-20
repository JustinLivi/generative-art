import React from 'react';

import { SpectrumGeneratorSeed0 } from '../series/spectrum-generator';
import { useWindowSize } from '../utilities/useWindowSize';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'SpectrumGenerator',
  component: SpectrumGeneratorSeed0,
};

export const Seed0 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <SpectrumGeneratorSeed0 width={constrainedWidth} height={constrainedHeight} />;
};
