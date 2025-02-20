import React from 'react';
import { Avatar, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { User } from '../../../types';
import { apiUrl } from '../../../globalConstants.ts';
import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
  user: User;
  title: string;
  image: string;
}

const OneCocktail: React.FC<Props> = ({ id, user, title, image }) => {
  const cocktailImage = image ? `${apiUrl}/${image}` : '';
  const userAvatar = user.avatar ? `${apiUrl}/${user.avatar}` : '';

  return (
    <Card
      component={NavLink}
      to={`/cocktails/${id}`}
      key={id}
      sx={{
        width: 350,
        borderRadius: 4,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textDecoration: 'none',
      }}
    >
      <CardMedia
        component="img"
        image={cocktailImage}
        sx={{
          height: 300,
          borderRadius: "16px 16px 0 0",
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '700' }}>{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar alt={user.displayName} src={userAvatar} />
          <Typography variant="subtitle1" color="text.secondary">
            {user.displayName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OneCocktail;
