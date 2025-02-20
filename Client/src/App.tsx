import AppToolbar from './components/Toolbar/Toolbar.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/users/containers/LoginPage.tsx';
import RegisterPage from './features/users/containers/RegisterPage.tsx';
import Cocktails from './features/cocktails/containers/Cocktails.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </main>

    </>
  );
};

export default App;