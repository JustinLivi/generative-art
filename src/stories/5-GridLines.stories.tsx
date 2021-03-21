import React from 'react';

import { GridLinesSeed0, GridLinesSeed1 } from '../series/grid-lines';
import { useWindowSize } from '../utilities/useWindowSize';

const Gridlines: React.FunctionComponent = ({ children }) => <div>{children}</div>;

// eslint-disable-next-line import/no-default-export
export default {
  title: 'GridLines',
  component: Gridlines,
};

export const Seed0 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <GridLinesSeed0 width={constrainedWidth} height={constrainedHeight} />;
};

export const Seed1 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <GridLinesSeed1 width={constrainedWidth} height={constrainedHeight} />;
};
