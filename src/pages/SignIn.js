// src/components/SignIn.js

import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider, githubProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleMagicLink = async () => {
    const actionCodeSettings = {
      url: `${process.env.REACT_APP_BASE_URL}/dashboard`,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    alert('Magic link sent to your email');
  };

  const handleOAuth = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      //console.error(error);
      setEmailError('INVALID_EMAIL')
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      //console.error(error);
      setEmailError('INVALID_EMAIL')
      
    }
  };

  return (
    <Container className='main-body' variant="dense">      
       <Typography align="center" sx={{ maxWidth: 'md', marginLeft:'120px' }}>
        <img src={logo} className="App-logo" alt="logo" />
      </Typography>
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
        helperText={emailError ? emailError : ""}
        error={emailError}
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
      <Box className="auth-box">
        <Button variant="outlined" color="primary" onClick={handleEmailSignIn} sx={{ m: 2 }}>
          Sign In with Email
        </Button>
        <Button variant="contained" color="primary" onClick={handleMagicLink} sx={{ m: 2 }}>
          Send Magic Link
        </Button>
        <Button variant="outlined" onClick={() => handleOAuth(googleProvider)} sx={{ m: 2 }}>
          Sign In with Google
        </Button>
        <Button variant="outlined" onClick={() => handleOAuth(facebookProvider)} sx={{ m: 2 }}>
          Sign In with Facebook
        </Button>
        <Button variant="outlined" onClick={() => handleOAuth(githubProvider)} sx={{ m: 2 }}>
          Sign In with GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;