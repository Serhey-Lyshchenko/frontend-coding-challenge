import React, { useState, FC } from 'react';

import Dropdown from './Dropdown';
import '../../App/Root/Root.scss';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import DropdownItem from '../DropdownItem/DropdownItem';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const WithToggling: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <TwoColumnGrid>
      <Dropdown
        label='With toggling'
        isOpen={isOpen}
        onFocus={() => setOpen(!isOpen)}
        onBlur={() => setOpen(false)}
      >
        {[1, 2, 3].map((n) => (
          <DropdownItem onClick={() => setOpen(false)}>
            Item
            {n}
          </DropdownItem>
        ))}
      </Dropdown>
    </TwoColumnGrid>
  );
};

export const WithErrorItem = () => (
  <TwoColumnGrid>
    <Dropdown label='With error item' isOpen>
      <DropdownItem>Default</DropdownItem>
      <DropdownItem error>Error</DropdownItem>
    </Dropdown>
  </TwoColumnGrid>
);

export const Disabled = () => (
  <TwoColumnGrid>
    <Dropdown label='Disabled' disabled>
      {[1, 2, 3].map((n) => (
        <DropdownItem>
Item
          {n}
        </DropdownItem>
      ))}
    </Dropdown>
  </TwoColumnGrid>
);
