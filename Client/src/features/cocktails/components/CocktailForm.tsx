import { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { CocktailMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { createCocktail, fetchCocktails } from '../cocktailThunks.ts';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState: CocktailMutation = {
  title: "",
  recipe: "",
  ingredients: [],
  image: null,
  isPublished: false,
};

const CocktailForm = () => {
  const [form, setForm] = useState<CocktailMutation>(initialState);
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([]);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.cocktails);
  const navigate = useNavigate();

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      ingredients.length === 0 ||
      !form.recipe ||
      !form.image ||
      ingredients[0].name.length === 0 ||
      ingredients[0].amount.length === 0
    ) {
      toast.warn('All fields are required!');
      return;
    }


    dispatch(createCocktail({
      ...form,
      ingredients: ingredients.filter(ing => ing.name && ing.amount),
    }));
    navigate('/');
    toast.success('Cocktail created successfully.');
    dispatch(fetchCocktails());
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredient = () => {
    if (ingredients.some(ing => !ing.name || !ing.amount)) return;
    setIngredients((prev) => [...prev, { name: '', amount: '' }]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredientsInputs = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setIngredients((prev) =>
      prev.map((ing, index) =>
        index === i ? { ...ing, [name]: value } : ing
      )
    );
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid>
          <Typography variant="h6">Ingredients</Typography>
          {ingredients.map((_ing, i) => (
            <Grid container key={i} spacing={2} sx={{ alignItems: 'center', marginBottom: '10px'}}>
              <Grid>
                <TextField
                  name="name"
                  label="Name"
                  required
                  value={ingredients[i].name}
                  onChange={(e) => onChangeIngredientsInputs(i, e)}
                  fullWidth
                />
              </Grid>

              <Grid>
                <TextField
                  name="amount"
                  label="Amount"
                  required
                  value={ingredients[i].amount}
                  onChange={(e) => onChangeIngredientsInputs(i, e)}
                  fullWidth
                />
              </Grid>

              <Grid>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteIngredient(i)}
                >
                  X
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button type="button" onClick={addIngredient}>
            + Add new ingredient
          </Button>
        </Grid>

        <Grid>
          <TextField
            id="recipe"
            name="recipe"
            label="Recipe"
            value={form.recipe}
            onChange={inputChangeHandler}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileEventChangeHandler}
          />
        </Grid>

        <Grid>
          <Button
            type="submit"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CocktailForm;
