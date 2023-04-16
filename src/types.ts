export interface Image {
  url: string;
  width: string;
  height: string;
}

export interface Images {
  fixed_height: Image;
  preview_gif: Image;
}

export interface Gif {
  id: string;
  title: string;
  alt_text: string;
  url: string;
  images: Images;
}
