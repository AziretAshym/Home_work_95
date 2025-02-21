import { createSlice } from "@reduxjs/toolkit";
import { ICocktail, GlobalError } from "../../types";
import {
  createCocktail,
  deleteCocktail,
  fetchCocktails,
  fetchOneCocktail,
  publishCocktail,
} from "./cocktailThunks.ts";

interface CocktailsState {
  cocktails: ICocktail[];
  oneCocktail: ICocktail | null;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: CocktailsState = {
  cocktails: [],
  oneCocktail: null,
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
        state.error = action.error.message
          ? { error: action.error.message }
          : null;
      })

      .addCase(fetchOneCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, action) => {
        state.loading = false;
        state.oneCocktail = action.payload;
      })
      .addCase(fetchOneCocktail.rejected, (state, action) => {
        state.error = action.error.message
          ? { error: action.error.message }
          : null;
      })

      .addCase(createCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCocktail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? { error: action.error.message }
          : null;
      })

      .addCase(deleteCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCocktail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? { error: action.error.message }
          : null;
      })

      .addCase(publishCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishCocktail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishCocktail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? { error: action.error.message }
          : null;
      });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
