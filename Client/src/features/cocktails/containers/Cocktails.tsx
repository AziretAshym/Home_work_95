import { Box, CircularProgress } from '@mui/material';
import { fetchCocktails } from '../coctailThunks.ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import OneCocktail from '../components/OneCocktail.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const { cocktails, loading } = useAppSelector((state) => state.cocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 3,
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          cocktails.map((cocktail) => (
            <OneCocktail
              key={cocktail._id}
              id={cocktail._id}
              user={cocktail.user}
              title={cocktail.title}
              image={cocktail.image}
            />
          ))
        )}
      </Box>
    </>
  );
};

export default Cocktails;