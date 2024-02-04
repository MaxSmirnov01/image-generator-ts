import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getData from '../api/getData';
import type { InitStateImages, Image, Images } from '../types/imgSliceTypes';
import type { UnsplashRandomPhoto, UnsplashSearchPhoto, Error } from '../types/apiTypes';

const initialState: InitStateImages = { text: '', images: [], favoriteImages: [], isFirstLoad: true, error: null };

const imgSlice = createSlice({
  name: 'img',
  initialState,
  reducers: {
    addText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },
    setFirstLoad: (state, { payload }: PayloadAction<boolean>) => {
      state.isFirstLoad = payload;
    },
    addFavorite: (state, { payload }: PayloadAction<Image>) => {
      if (!state.favoriteImages.some((item) => item.id === payload.id)) {
        state.favoriteImages.push(payload);
      }
    },
    removeFavorite: (state, { payload }: PayloadAction<Image>) => {
      const newState = state.favoriteImages.filter((item) => item.id !== payload.id);
      state.favoriteImages = newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }: PayloadAction<UnsplashRandomPhoto[] | UnsplashSearchPhoto>) => {
        const newState: Images = payload.hasOwnProperty('results')
          ? (payload as UnsplashSearchPhoto).results.map((item: UnsplashRandomPhoto) => ({
              id: item.id,
              url: item.urls.small,
              modalUrl: item.urls.regular,
              author: item.user.name,
              description: item.alt_description,
            }))
          : (payload as UnsplashRandomPhoto[]).map((item: UnsplashRandomPhoto) => ({
              id: item.id,
              url: item.urls.small,
              modalUrl: item.urls.regular,
              author: item.user.name,
              description: item.alt_description,
            }));

        if (state.isFirstLoad) {
          state.images = newState;
          state.isFirstLoad = false;
        } else {
          state.images = [...state.images, ...newState];
        }
      })
      .addCase(getData.rejected, (state, { payload }) => {
        state.error = payload as Error;
      });
  },
});

export const { addText, setFirstLoad, addFavorite, removeFavorite } = imgSlice.actions;

export default imgSlice.reducer;
