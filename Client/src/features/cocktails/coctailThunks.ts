import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktail } from '../../types';

export const fetchCocktails = createAsyncThunk<ICocktail[]>(
  "cocktails/fetchCocktails",
  async () => {
    const response = await axiosApi.get(`/cocktails`);
    return response.data;
  }
);