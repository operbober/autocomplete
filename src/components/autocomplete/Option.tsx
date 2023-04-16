import React, { useCallback } from "react";
import styles from './Option.module.css';

interface OptionProps {
  value: string;
  query: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

export const Option: React.FC<OptionProps> = ({ value, query, isActive, onClick }) => {
  
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);
  
  return (
    <div
      className={`${styles.option} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      <b>{query}</b>{value.slice(query.length)}
    </div>
  );
};
