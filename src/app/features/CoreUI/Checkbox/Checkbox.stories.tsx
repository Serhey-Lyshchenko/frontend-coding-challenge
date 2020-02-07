import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const normal = () => (
  <Checkbox name='story1' onChange={action('changed')} />
);

export const checked = () => (
  <Checkbox name='story2' defaultValue onChange={action('changed')} />
);

export const withLabel = () => (
  <Checkbox name='story3' label='Status' onChange={action('changed')} />
);

export const disabledNormal = () => (
  <Checkbox name='story4' disabled />
);

export const disabledChecked = () => (
  <Checkbox name='story5' defaultValue disabled />
);

export const disabledWithLabel = () => (
  <Checkbox name='story6' label='Status' defaultValue disabled />
);
