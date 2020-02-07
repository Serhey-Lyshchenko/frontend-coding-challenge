import React, { FC, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Dropdown.module.scss';
import DropDownIcon from '../Icons/DropDownIcon';

interface Props {
  /**
   * Define label. Default: ''
   */
  label?: string;

  /**
   * Define disabled option. Default: false
   */
  disabled?: boolean;

  /**
   * Define is opened option. Default: false
   */
  isOpen?: boolean;

  /**
   * Define callback on focus event.
   */
  onFocus?: () => void;

  /**
   * Define callback on blur event.
   */
  onBlur?: () => void;
}

const Dropdown: FC<Props> = ({
  children,
  disabled = false,
  label = '',
  isOpen = false,
  onFocus = () => null,
  onBlur = () => null,
}) => {
  const arrowClass = !disabled && isOpen ? classNames(styles.arrow, styles.opened) : styles.arrow;
  const menuClass = !disabled && isOpen ? classNames(styles.menu, styles.opened) : styles.menu;
  const labelClass = disabled ? classNames(styles.label, styles.disabled) : styles.label;
  const inputClass = disabled ? classNames(styles.input, styles.disabled) : styles.input;
  const ref = React.createRef<HTMLDivElement>();
  const [allowBlur, setAllowBlur] = useState(true);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      setAllowBlur(true);
    } else {
      setAllowBlur(false);
    }
  }, [ref]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <label className={labelClass}>
        {label}
        <span className={arrowClass}>
          <DropDownIcon />
        </span>
        <input
          value=''
          onChange={() => null}
          className={inputClass}
          onFocus={() => onFocus()}
          onBlur={() => allowBlur && onBlur()}
        />
      </label>
      <div className={menuClass}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
