import { AppBar, Box, Toolbar } from "@mui/material";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #ff4e50, #f9d423)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            minHeight: "64px",
            color: "#fff",
          }}
        >
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
