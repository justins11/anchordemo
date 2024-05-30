// src/components/LogoutButton.js

import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, Container, Button, Box } from '@mui/material';


const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setLoading(true);
        console.log('User signed out');
        // Optionally, redirect the user to the login page or home page
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Button variant="outlined" className='' color="primary" onClick={handleLogout} sx={ { borderRadius: 25 } }>Logout</Button>
  );
};

export default LogoutButton;
