import AppToolbar from "./components/Toolbar/Toolbar.tsx";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/users/containers/LoginPage.tsx";
import RegisterPage from "./features/users/containers/RegisterPage.tsx";
import Cocktails from "./features/cocktails/containers/Cocktails.tsx";
import CocktailForm from "./features/cocktails/components/CocktailForm.tsx";
import CocktailDetails from "./features/cocktails/containers/CocktailDetails.tsx";
import MyCocktails from "./features/cocktails/containers/MyCocktails.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Caveat", cursive',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to top, #ff7e5f, #feb47b)",
          color: "#fff",
          padding: "20px 0",
        }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/cocktails/:id" element={<CocktailDetails />} />
            <Route path="/cocktails/my-cocktails" element={<MyCocktails />} />
            <Route
              path="/cocktails/add-new-cocktail"
              element={<CocktailForm />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <Typography variant={"h3"} textAlign="center">
                  Not Found
                </Typography>
              }
            />
          </Routes>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;
