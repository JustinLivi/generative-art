import React from 'react';

import { CommunitySeed0, CommunitySeed1, CommunityStatement } from '../series/community';

const Community: React.FunctionComponent = ({ children }) => <div>{children}</div>;

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Community',
  component: Community,
};

export const Statement = () => <CommunityStatement />;

export const Seed0 = () => <CommunitySeed0 />;

export const Seed1 = () => <CommunitySeed1 />;
