import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Stack } from '@mui/material';
import { setPage, setRequestedPage, defaultValues } from '../../slices/pageSlice';
import getData from '../../api/getData';
import type { RootState, AppDispatch } from '../../slices/store';

const { contentCount } = defaultValues;

const Pagination1 = () => {
  const dispatch: AppDispatch = useDispatch();

  const { text, images } = useSelector((state: RootState) => state.images);
  const { page, requestedPage } = useSelector((state: RootState) => state.pages);

  const pageCount = Math.ceil(images.length / contentCount);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));

    if (value === pageCount) {
      dispatch(setRequestedPage(requestedPage + 1));
      dispatch(getData({ text, requestedPage }));
    }
  };

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Pagination count={pageCount} page={page} onChange={handleChange} shape="rounded" />
    </Stack>
  );
};

export default Pagination1;
