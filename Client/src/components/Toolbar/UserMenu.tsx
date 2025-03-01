import React, { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { User } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import { unsetUser } from "../../features/users/usersSlice.ts";
import { logout } from "../../features/users/usersThunks.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";
import logo from "../../assets/logo.png";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate("/login");
  };

  const userAvatar = user.avatar ? `${apiUrl}/${user.avatar}` : "";

  return (
    <>
      <Typography
        variant="h3"
        component={NavLink}
        to="/"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
      }}
      >
        <img src={logo} alt="logo" style={{height: '40px', width: 'auto'}}/> Cocktail Craft
      </Typography>
      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
        <Avatar alt={user.displayName} src={userAvatar} />
        <Button onClick={handleClick} color="inherit">
          {user.displayName}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/cocktails/my-cocktails");
              setAnchorEl(null);
            }}
          >
            My cocktails
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/cocktails/add-new-cocktail");
              setAnchorEl(null);
            }}
          >
            Add new cocktail
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
