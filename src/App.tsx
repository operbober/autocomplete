import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete } from './components/autocomplete/Autocomplete';
import { Gifs } from './components/gifs/Gifs';
import { useApi } from './hooks/useApi';
import { searchTags } from './service';

export function App() {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState(query);
  const [options, setOptions] = useState<string[]>([]);
  const { result: tags, makeRequest: getTags } = useApi(searchTags);
  
  useEffect(() => {
    setValue(query)
  }, [query]);
  
  useEffect(() => {
    setOptions(tags || []);
  }, [tags]);
  
  useEffect(() => {
    if (!value) {
      return;
    }
    
    getTags(value);
  }, [value]);
  
  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  
  const handleSelect = useCallback((selectedValue: string) => {
    setQuery(selectedValue.trim());
  }, []);
  
  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        onChange={handleChange}
        onSelect={handleSelect}
      />
      <Gifs query={query}/>
    </div>
  );
}
