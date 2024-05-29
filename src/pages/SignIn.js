// src/components/SignIn.js


import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider, githubProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleMagicLink = async () => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/dashboard',
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    alert('Magic link sent to your email');
  };

  const handleOAuth = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>      
       {/* <Typography variant="h4" gutterBottom>
        <img src={logo} className="App-logo" alt="logo" />
      </Typography> */}
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        placeholder='user@email.com'
        required

      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        placeholder='******'
        required
      />
      <Button variant="contained" color="primary" onClick={handleEmailSignIn} sx={{ m: 2 }}>
        Sign In with Email
      </Button>
      <Button variant="contained" onClick={() => handleOAuth(googleProvider)} sx={{ m: 2 }}>
        Sign In with Google
      </Button>
      <Button variant="contained" onClick={() => handleOAuth(facebookProvider)} sx={{ m: 2 }}>
        Sign In with Facebook
      </Button>
      <Button variant="contained" onClick={() => handleOAuth(githubProvider)} sx={{ m: 2 }}>
        Sign In with GitHub
      </Button>
    </Container>
  );
};

export default SignIn;