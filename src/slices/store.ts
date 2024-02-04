import { configureStore } from '@reduxjs/toolkit';

import imageReducer from './imgSlice';
import pageReducer from './pageSlice';

const store = configureStore({
  reducer: {
    images: imageReducer,
    pages: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
