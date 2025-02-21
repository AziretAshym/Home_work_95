import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  deleteCocktail,
  fetchCocktails,
  fetchOneCocktail,
  publishCocktail,
} from "../cocktailThunks.ts";
import { apiUrl } from "../../../globalConstants.ts";
import { Delete, LocalBar } from "@mui/icons-material";

const CocktailDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { oneCocktail, loading } = useAppSelector((state) => state.cocktails);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch, id]);

  if (!oneCocktail) {
    return <Typography>No cocktail found</Typography>;
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteCocktail(oneCocktail._id)).unwrap();
      navigate("/");
      dispatch(fetchCocktails());
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = async () => {
    try {
      await dispatch(publishCocktail(oneCocktail._id)).unwrap();
      await dispatch(fetchOneCocktail(oneCocktail._id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" justifyContent="center" mt={4}>
          <Card
            sx={{
              display: "flex",
              gap: 3,
              padding: 3,
              background: "linear-gradient(135deg, #fff8e1, #ffe0b2)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              borderRadius: "18px",
              maxWidth: "800px",
              width: "100%",
              color: "#5d4037",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                image={`${apiUrl}/${oneCocktail.image}`}
                alt={oneCocktail.title}
                sx={{
                  width: "300px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                  marginBottom: 2,
                }}
              />
              {user?.role === "admin" ? (
                oneCocktail.isPublished ? (
                  <Typography sx={{ color: "green", marginBottom: 1 }}>
                    The cocktail is published
                  </Typography>
                ) : (
                  <Typography sx={{ color: "orange", marginBottom: 1 }}>
                    The cocktail is under review by the admin
                  </Typography>
                )
              ) : (
                !oneCocktail.isPublished && (
                  <Typography sx={{ color: "orange", marginBottom: 1 }}>
                    The cocktail is under review by the admin
                  </Typography>
                )
              )}
              {user?.role === "admin" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handlePublish}
                    disabled={loading}
                  >
                    {oneCocktail.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                  <IconButton
                    sx={{
                      backgroundColor: "error.main",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
            <CardContent>
              <Typography variant="h3" marginBottom="20px">
                {oneCocktail.title}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Ingredients:
              </Typography>
              <List>
                {oneCocktail.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LocalBar sx={{ color: "#d84315" }} />
                    </ListItemIcon>
                    <ListItemText>
                      {ingredient.name} - {ingredient.amount}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Recipe:
              </Typography>
              <Typography>{oneCocktail.recipe}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default CocktailDetails;
