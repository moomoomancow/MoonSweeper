import React from 'react';
import './App.css';
import BoardGenerator from './components/BoardGenerator'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
       <BoardGenerator/>
    </ChakraProvider>
  );
}

export default App;
