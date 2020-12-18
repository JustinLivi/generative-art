/* eslint-disable import/no-extraneous-dependencies */
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import React from 'react';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Welcome',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};
