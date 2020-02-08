import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Select from './Select';

const mockOptions = [
  { label: 'First', value: 'First value' },
  { label: 'Second', value: 'Second value' },
  { label: 'Third', value: 'Third value' },
];

describe('Select', () => {
  afterEach(cleanup);

  it('renders in the document', () => {
    const { container } = render(<Select options={mockOptions} />);
    expect(container).toBeInTheDocument();
  });

  it('displays placeholder', () => {
    const placeholder = 'test';
    const { getByText } = render(<Select options={mockOptions} placeholder={placeholder} />);
    const element = getByText(placeholder);
    expect(element).toBeInTheDocument();
  });

  it('opens menu and options displayed correct', () => {
    const placeholder = 'test';
    const { getByText } = render(<Select options={mockOptions} placeholder={placeholder} />);

    fireEvent.click(getByText(placeholder));

    expect(getByText(mockOptions[0].label)).toBeInTheDocument();
    expect(getByText(mockOptions[1].label)).toBeInTheDocument();
    expect(getByText(mockOptions[2].label)).toBeInTheDocument();
  });
});
