import { Simulate } from 'react-dom/test-utils';
import { GIPHY_API_KEY } from './constants';
import { Gif } from './types';

interface TermObject {
  name: string;
}

interface SearchTagsResponse {
  data: TermObject[];
  meta: unknown;
}

export async function searchTags(query: string): Promise<string[]> {
  if (!GIPHY_API_KEY) {
    throw new Error('Api key is not defined!');
  }
  
  const searchParams = new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: query,
    limit: '5',
  });
  const response = await fetch('https://api.giphy.com/v1/gifs/search/tags?' + searchParams);
  const data: SearchTagsResponse = await response.json();
  
  return data.data.map(termObject => termObject.name);
}

interface SearchGifsResponse {
  data: Gif[];
  pagination: unknown;
  meta: unknown;
}

export async function searchGifs(query: string): Promise<Gif[]> {
  if (!GIPHY_API_KEY) {
    throw new Error('Api key is not defined!');
  }
  
  const searchParams = new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: query,
    limit: '20',
  });
  
  const response = await fetch('https://api.giphy.com/v1/gifs/search?' + searchParams);
  const data: SearchGifsResponse = await response.json();
  
  return data.data;
}
