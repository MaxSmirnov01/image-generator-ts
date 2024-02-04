import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './apiUrls';
import type { GetDataArg, Error, Response } from '../types/apiTypes';

const apiKey: string = import.meta.env.VITE_REACT_APP_UNSPLASH_TOKEN;

const getData = createAsyncThunk('getData', async ({ text, requestedPage }: GetDataArg, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.getData(text, requestedPage), {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });

    const { data }: Response = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: Error = {
        data: error.response?.data,
        status: error.response!.status,
      };
      return rejectWithValue(err);
    }
    throw new Error();
  }
});

export default getData;
