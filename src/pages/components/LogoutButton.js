// src/pages/LogoutButton.js

import React from 'react';
import { auth } from '../firebase';
import { TextField, Button, Typography, Container, Box } from '@mui/material';


const LogoutButton = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
        // Optionally, redirect the user to the login page or home page
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

  return (
    <Container className='main-body'>  
        <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
        </Button>
    </Container>
  );
};

export default LogoutButton;
