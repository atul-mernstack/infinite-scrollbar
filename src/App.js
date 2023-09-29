// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { PostList } from "./components/PostList";

import { Container,Typography } from '@mui/material';

function App() {
  return (
   
      <Container maxWidth='md'>
        <Typography variant='h4' align='center'>
        <PostList/>
        </Typography>
      </Container>      

  );
}

export default App;
