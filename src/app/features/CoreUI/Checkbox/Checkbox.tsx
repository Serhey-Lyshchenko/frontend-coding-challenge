import React, { FC, forwardRef, Ref, useCallback, useState } from 'react';

import Label from '../Label/Label';
import styles from './Checkbox.module.scss';
import CheckIcon from '../Icons/CheckIcon';

interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label to be displayed alongside with toggle input
   */
  label?: string;

  /**
   * Default value of toggle input, does not make the input controlled
   */
  defaultValue?: boolean;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (newChecked: boolean) => void;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: FC<Props> = forwardRef((props, ref) => {
  const { label, defaultValue, disabled, onChange, ...otherProps } = props;

  const [isChecked, setChecked] = useState(!!defaultValue);

  const toggle = useCallback(
    () => {
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange],
  );

  return (
    <Label title={label || ''} disabled={disabled} position='right'>
      <input
        type='checkbox'
        id={otherProps.name}
        className={styles.input}
        ref={ref}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        {...otherProps}
      />
      <label className={styles.checkbox} htmlFor={otherProps.name}>
        <CheckIcon />
      </label>
    </Label>
  );
});

export default Checkbox;
