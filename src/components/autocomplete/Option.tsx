import React, { useCallback } from "react";
import styles from './Option.module.css';

interface OptionProps {
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

export const Option: React.FC<OptionProps> = ({ value, isActive, onClick }) => {
  
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);
  
  return (
    <div
      className={`${styles.option} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}
