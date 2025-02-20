import { createSlice } from "@reduxjs/toolkit";
import { ICocktail, GlobalError } from "../../types";
import { fetchCocktails } from './coctailThunks.ts';

interface CocktailsState {
  cocktails: ICocktail[];
  loading: boolean;
  error: GlobalError | null;
}

const initialState: CocktailsState = {
  cocktails: [],
  loading: false,
  error: null,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
      state.loading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktails = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? { error: action.error.message } : null;
      })
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;
