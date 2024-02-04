import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFirstLoad } from './imgSlice';
import type { InitStatePage } from '../types/pageSliceTypes';

export const defaultValues = {
  page: 1,
  requestedPage: 2,
  contentCount: 12,
};

const initialState: InitStatePage = {
  page: defaultValues.page,
  requestedPage: defaultValues.requestedPage,
  favoritePage: defaultValues.page,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setRequestedPage: (state, { payload }: PayloadAction<number>) => {
      state.requestedPage = payload;
    },
    setFavoritePage: (state, { payload }: PayloadAction<number>) => {
      state.favoritePage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFirstLoad, (state) => {
      state.page = defaultValues.page;
      state.requestedPage = defaultValues.requestedPage;
    });
  },
});

export const { setPage, setRequestedPage, setFavoritePage } = pageSlice.actions;
export default pageSlice.reducer;
