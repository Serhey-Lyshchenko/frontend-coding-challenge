import React from 'react';
import { action } from '@storybook/addon-actions';

import Select from './Select';
import '../../App/Root/Root.scss';

export default {
  component: Select,
  title: 'Select',
};

const mockOptions = [
  { label: 'First', value: 'First value' },
  { label: 'Second', value: 'Second value' },
  { label: 'Third', value: 'Third value' },
];

export const normal = () => (
  <Select options={mockOptions} onChange={action('changed')} />
);

export const fullWidth = () => (
  <Select options={mockOptions} fullWidth onChange={action('changed')} />
);

export const withPlaceholder = () => (
  <Select options={mockOptions} placeholder='Select...' onChange={action('changed')} />
);

export const preselected = () => (
  <Select
    options={mockOptions}
    value={mockOptions[1].value}
    onChange={action('changed')}
  />
);

export const disabled = () => (
  <Select
    options={mockOptions}
    disabled
    value={mockOptions[0].value}
    onChange={action('changed')}
  />
);

export const multiple = () => (
  <Select
    options={mockOptions}
    multiple
    onChange={action('changed')}
  />
);
