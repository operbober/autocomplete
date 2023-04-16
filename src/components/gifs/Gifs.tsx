import React, { useEffect } from 'react';
import { useApi } from 'hooks/useApi';
import { searchGifs } from 'service';
import styles from './Gifs.module.css';


interface GifsProps {
  query: string;
}

export const Gifs: React.FC<GifsProps> = ({ query }) => {
  const { result: gifs, makeRequest: getGifs } = useApi(searchGifs);
  
  useEffect(() => {
    getGifs(query);
  }, [query]);
  
  if (!gifs?.length) {
    return null;
  }
  
  return <div className={styles.wrapper}>
    {gifs?.map((gif) =>
      <img src={gif.images.preview_gif.url}/>,
    )}
  </div>;
};
