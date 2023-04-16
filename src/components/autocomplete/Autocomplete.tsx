import React, { KeyboardEvent, useCallback, useRef, useState } from 'react';
import styles from './Aautocomplete.module.css';
import { Option } from './Option';
import { useHandleClickOutside } from 'hooks/useHandleClickOutside';

interface AutoCompleteProps {
  value: string;
  options: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  options,
  onChange,
  onSelect,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const resetActiveIndex = () => {
    setActiveIndex(-1);
  }
  
  const hideOptions = () => {
    resetActiveIndex();
    setShowOptions(false);
  }
  
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange?.(e.target.value);
    resetActiveIndex();
    setShowOptions(true);
  }, []);
  
  const handleInputClick = useCallback(() => {
    setShowOptions(true);
  }, []);
  
  const handleOptionClick = useCallback((option: string) => {
    onSelect?.(option);
    hideOptions();
  }, []);
  
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && options.length) {
      event.preventDefault();
      setShowOptions(true);
      setActiveIndex((prevIndex) =>
        prevIndex === options.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (event.key === "ArrowUp" && options.length) {
      event.preventDefault();
      setShowOptions(true);
      setActiveIndex((prevIndex) =>
        prevIndex < 1 ? options.length - 1 : prevIndex - 1,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex !== -1 && options[activeIndex]) {
        handleOptionClick(options[activeIndex]);
      } else {
        handleOptionClick(value);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      hideOptions();
    }
  };
  
  useHandleClickOutside(wrapperRef, hideOptions, []);
  
  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      {showOptions && options.length > 0 && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <Option
              key={option}
              value={option}
              query={value}
              isActive={index === activeIndex}
              onClick={handleOptionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
