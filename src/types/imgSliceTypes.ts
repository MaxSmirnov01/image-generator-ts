import type { Error } from './apiTypes';

export type Image = {
  id: string;
  url: string;
  modalUrl: string;
  author: string;
  description: string;
  file?: string;
};

export type Images = Image[];

export type InitStateImages = {
  text: string;
  images: Images;
  favoriteImages: Images;
  isFirstLoad: boolean;
  error: null | Error;
};
