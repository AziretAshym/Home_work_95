import { Box, CircularProgress } from '@mui/material';
import { fetchCocktails } from '../cocktailThunks.ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import OneCocktail from '../components/OneCocktail.tsx';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const { cocktails, loading } = useAppSelector((state) => state.cocktails);
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const userCocktails = cocktails.filter(cocktail => cocktail.user?._id === user?._id);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 3,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        userCocktails.map((cocktail) => (
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
  );
};

export default MyCocktails;
