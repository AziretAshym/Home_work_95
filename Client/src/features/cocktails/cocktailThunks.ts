import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CocktailMutation, ICocktail } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchCocktails = createAsyncThunk<ICocktail[]>(
  "cocktails/fetchCocktails",
  async () => {
    const response = await axiosApi.get(`/cocktails`);
    return response.data;
  }
);

export const fetchOneCocktail = createAsyncThunk<ICocktail, string>(
  "cocktails/fetchOneCocktail",
  async (id) => {
    const response = await axiosApi.get(`/cocktails/${id}`);
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation, { state: RootState }>(
  "cocktails/addNewCocktail",
  async (cocktailMutation, { getState }) => {
    const token = getState().users.user?.token;
    if (!token) throw new Error("No token found");

    const formData = new FormData();

    formData.append("title", cocktailMutation.title);
    formData.append("recipe", cocktailMutation.recipe);

    formData.append("ingredients", JSON.stringify(cocktailMutation.ingredients));

    if (cocktailMutation.image) {
      formData.append("image", cocktailMutation.image);
    }
    console.log([...formData.entries()]);

    await axiosApi.post("/cocktails/add-new-cocktail", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
);
