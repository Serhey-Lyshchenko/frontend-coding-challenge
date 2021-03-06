import React, {
  FC,
  createRef,
  forwardRef,
  Ref,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';
import DropDownIcon from '../Icons/DropDownIcon';
import Checkbox from '../Checkbox/Checkbox';

interface Option {
  label: string;
  value: string;
}

interface Props {

  /**
   * Options
   */
  options: Array<Option>;

  /**
     * Identifier for form submit
     */
  name?: string;

  /**
     * Placeholder to show when empty
     */
  placeholder?: string;

  /**
     * Register callback for change event
     */
  onChange?: (newValue: Option[]) => void;

  /**
     * Read only mode. Default: false
     */
  disabled?: boolean;

  /**
     * input className
     */
  className?: string;

  /**
     * Current selected value
     */
  value?: string;

  /**
     * React ref passtrough to input node
     */
  ref?: Ref<HTMLInputElement>;

  /**
    * Full width
    */
  fullWidth?: boolean;

  /**
   * Multi select option
   */
  multiple?: boolean;
}

const Select: FC<Props> = forwardRef((props, ref) => {
  const { className, options, value, placeholder, fullWidth, disabled, multiple, name, onChange = () => {} } = props;
  const currentReference = createRef<HTMLDivElement>();
  const selectReference = createRef<HTMLSelectElement>();

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const opt = options.find((option) => option.value === value);
    if (opt) {
      setSelectedOptions((oldOptions) => [opt, ...oldOptions]);
    }
  }, [value, options]);

  const outsideClickHandler = useCallback((event) => {
    const { current } = currentReference;
    if (current && !current.contains(event.target)) {
      setIsOpened(!isOpened);
    }
  }, [isOpened, currentReference]);

  const buttonClickHandler = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    if (selectReference.current && !isOpened) {
      selectReference.current.focus();
    }
    setIsOpened(!isOpened);
  }, [isOpened, selectReference]);

  const scrollToSelectedOption = useCallback((i: number) => {
    const reference = currentReference.current;
    if (!reference) return;
    const optionElement = reference.getElementsByClassName(styles.option)[i];
    optionElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [currentReference]);

  const keyDownHandler = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsOpened(!isOpened);
    }
    if (event.key === 'Tab') {
      setIsOpened(false);
    }
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !multiple) {
      event.preventDefault();
      let ind = options.findIndex((opt: Option) => selectedOptions.includes(opt));
      const diff = event.key === 'ArrowDown' ? 1 : -1;
      ind = ind === -1 && diff === -1 ? options.length : ind;
      const opt = options[ind + diff];
      if (opt) {
        onChange([opt]);
        setSelectedOptions([opt]);
        if (isOpened) {
          scrollToSelectedOption(ind + diff);
        }
      }
    }
  }, [options, selectedOptions, isOpened, scrollToSelectedOption, multiple, onChange]);

  const selectOptionHandler = useCallback((event: MouseEvent, option: Option) => {
    event.stopPropagation();
    event.preventDefault();


    if (multiple) {
      setSelectedOptions(
        (old) => {
          const updatedOptions = old.includes(option)
            ? old.filter((opt) => opt.value !== option.value)
            : [...old, option];
          onChange(updatedOptions);
          return updatedOptions;
        },
      );
      if (!event.ctrlKey) {
        setIsOpened(false);
      }
    } else {
      onChange([option]);
      setSelectedOptions([option]);
      setIsOpened(false);
    }
  }, [multiple, onChange]);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', outsideClickHandler);
    } else {
      document.removeEventListener('click', outsideClickHandler);
    }

    return () => document.removeEventListener('click', outsideClickHandler);
  }, [isOpened, outsideClickHandler]);

  const selectedLabels = useMemo(
    () => selectedOptions.map(({ label }) => label).join(', '),
    [selectedOptions],
  );

  const selectedValue = useMemo(
    () => selectedOptions.map(({ value: v }) => v).join(', '),
    [selectedOptions],
  );

  const renderSelected = useMemo(() => (
    <div className={styles.selectedValue}>{selectedLabels}</div>
  ), [selectedLabels]);

  const renderPlaceholder = useMemo(() => (
    <div className={styles.placeholder}>{placeholder}</div>
  ), [placeholder]);

  const renderSelectButton = useMemo(() => {
    const buttonClasses = classNames(
      styles.selectBtn,
      {
        [styles.fullWidth]: fullWidth,
        [styles.disabled]: disabled,
        [styles.opened]: isOpened,
      },
    );
    return (
      <button className={buttonClasses} onClick={buttonClickHandler} type='button'>
        {selectedOptions.length > 0 ? renderSelected : renderPlaceholder}
        <DropDownIcon />
      </button>
    );
  }, [buttonClickHandler, selectedOptions, fullWidth, disabled, renderSelected, renderPlaceholder, isOpened]);

  const renderOption = useCallback((option: Option) => {
    const isActive = selectedOptions.includes(option);
    const optionClasses = classNames(
      [styles.option],
      { [styles.active]: !multiple && isActive },
    );
    return (
      <button
        className={optionClasses}
        onClick={(event: unknown) => selectOptionHandler(event as MouseEvent, option)}
        key={option.value}
      >
        {multiple && <Checkbox defaultValue={isActive} />}
        {option.label}
      </button>
    );
  }, [selectedOptions, selectOptionHandler, multiple]);

  const renderOptions = useMemo(() => (<div className={styles.options}>{options.map(renderOption)}</div>),
    [options, renderOption]);

  const wrapperClasses = classNames(
    [styles.wrapper],
    className,
    { [styles.fullWidth]: fullWidth },
  );
  return (
    <div role='button' ref={currentReference} className={wrapperClasses} tabIndex={0} onKeyDown={keyDownHandler}>
      {renderSelectButton}
      {isOpened && renderOptions}
      <input name={name} ref={ref} value={selectedValue} onChange={() => {}} />
    </div>
  );
});

export default Select;
