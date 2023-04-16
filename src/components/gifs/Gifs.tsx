import React, { useEffect, useState } from 'react';
import { searchGifs } from 'service';
import { Gif } from 'types';
import styles from './Gifs.module.css';


interface GifsProps {
  query: string;
}

export const Gifs: React.FC<GifsProps> = ({ query }) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  
  useEffect(() => {
    searchGifs(query).then((gifs) => {
      setGifs(gifs);
    });
  }, [query]);
  
  if (!gifs?.length) {
    return null;
  }
  
  return <div className={styles.wrapper}>
    {gifs?.map((gif) =>
      <img key={gif.id} src={gif.images.preview_gif.url} alt={gif.alt_text}/>,
    )}
  </div>;
};
