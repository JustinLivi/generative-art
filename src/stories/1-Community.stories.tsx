import React from 'react';

import { CommunitySeed0, CommunitySeed1, CommunityStatement } from '../series/community';
import { useWindowSize } from '../utilities/useWindowSize';

const Community: React.FunctionComponent = ({ children }) => <div>{children}</div>;

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Community',
  component: Community,
};

export const Statement = () => <CommunityStatement />;

export const Seed0 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <CommunitySeed0 width={constrainedWidth} height={constrainedHeight} />;
};

export const Seed1 = () => {
  const { width, height } = useWindowSize();
  if (width === undefined || height === undefined) {
    return <></>;
  }
  const constrainedWidth = Math.min(width, 1920);
  const constrainedHeight = Math.floor(constrainedWidth * (9 / 16));
  return <CommunitySeed1 width={constrainedWidth} height={constrainedHeight} />;
};
