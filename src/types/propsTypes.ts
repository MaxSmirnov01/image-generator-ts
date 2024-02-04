import type { Image, Images } from './imgSliceTypes';

export type ModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (arg: boolean) => void;
  img: Image;
};

export type ButtonProps = {
  item: Image;
};

export type PaginationProps = {
  favoriteImages: Images;
  currentImages: Image[];
};
