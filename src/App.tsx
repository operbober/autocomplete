import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete } from './components/autocomplete/Autocomplete';
import { getFruits } from './service';

export function App() {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  
  useEffect(() => {
    setOptions([]);
    
    if (!query || !query) {
      return;
    }
    
    getFruits(query).then((fruits) => {
      setOptions(fruits);
    });
  }, [query])
  
  const handleChange = useCallback((value: string) => {
    setQuery(value);
  }, []);
  
  const handleSelect = useCallback((value: string) => {
    setQuery(value);
  }, []);
  
  return (
    <AutoComplete
      value={query}
      options={options}
      onChange={handleChange}
      onSelect={handleSelect}
    />
  );
}
