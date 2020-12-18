import React from 'react';

import { CommunitySeed0, CommunityStatement } from '../series/community';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Community',
  component: CommunitySeed0,
};

export const Statement = () => <CommunityStatement />;

export const Seed0 = () => <CommunitySeed0 />;
