import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Stack } from '@mui/material';
import { defaultValues, setFavoritePage } from '../../slices/pageSlice';
import type { RootState, AppDispatch } from '../../slices/store';
import type { PaginationProps } from '../../types/propsTypes';

const { contentCount } = defaultValues;

const Pagination2: React.FC<PaginationProps> = ({ favoriteImages, currentImages }) => {
  const dispatch: AppDispatch = useDispatch();

  const { favoritePage } = useSelector((state: RootState) => state.pages);

  const pageCount = Math.ceil(favoriteImages.length / contentCount);

  useEffect(() => {
    if (currentImages.length === 0 && favoritePage > 1) {
      dispatch(setFavoritePage(favoritePage - 1));
    }
  }, [currentImages, dispatch, favoritePage]);

  if (favoriteImages.length === 0) {
    return null;
  }

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setFavoritePage(value));
  };

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Pagination count={pageCount} page={favoritePage} onChange={handleChange} shape="rounded" />
    </Stack>
  );
};

export default Pagination2;
