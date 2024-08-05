import React from 'react';
import './App.css';
import GameBoard from './components/BoardGenerator'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
       <GameBoard/>
    </ChakraProvider>
  );
}

export default App;
