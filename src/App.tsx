import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete } from './components/autocomplete/Autocomplete';
import { Gifs } from './components/gifs/Gifs';
import { searchTags } from './service';
import { debounce } from './utils';

export function App() {
  const [selectedValue, setSelectedValue] = useState('');
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  
  const debouncedSearchTags = useMemo(() => debounce((query: string) => {
    if (!query) {
      return;
    }
    
    searchTags(query).then((tags) => {
      setOptions(tags);
    });
  }, 250), []);
  
  useEffect(() => {
    setOptions([]);
    debouncedSearchTags(query);
  }, [debouncedSearchTags, query])
  
  const handleChange = useCallback((value: string) => {
    setQuery(value);
  }, []);
  
  const handleSelect = useCallback((value: string) => {
    setSelectedValue(value);
  }, []);
  
  return (
    <div>
      <AutoComplete
        value={query}
        options={options}
        onChange={handleChange}
        onSelect={handleSelect}
      />
      <Gifs query={selectedValue}/>
    </div>
  );
}
