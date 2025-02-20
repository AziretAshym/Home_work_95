import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { fetchOneCocktail } from '../cocktailThunks.ts';
import { apiUrl } from '../../../globalConstants.ts';
import { LocalBar } from '@mui/icons-material';

const CocktailDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { oneCocktail, loading } = useAppSelector((state) => state.cocktails);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!oneCocktail) {
    return <Typography>No cocktail found</Typography>;
  }

  return (
    <Card sx={{display: 'flex',  gap: 1, padding: 4}}>
      <CardMedia
        component="img"
        image={`${apiUrl}/${oneCocktail.image}`}
        alt={oneCocktail.title}
        sx={{ width: '300px', borderRadius: '18px' }}
      />
      <CardContent>
        <Box>
          <Typography variant="h3" marginBottom="30px">{oneCocktail.title}</Typography>
          <Typography variant="h6">Ingredients:</Typography>
          <List>
            {oneCocktail.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <LocalBar sx={{color: "red"}} />
                </ListItemIcon>
                <ListItemText>
                  {ingredient.name} - {ingredient.amount}
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Recipe:</Typography>
          <Typography>{oneCocktail.recipe}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CocktailDetails;
