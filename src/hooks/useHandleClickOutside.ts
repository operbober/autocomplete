import React, { useEffect, DependencyList } from 'react';

export function useHandleClickOutside(ref: React.RefObject<HTMLElement>, cb: () => void, deps?: DependencyList) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deps]);
}
