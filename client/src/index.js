import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import theme from './theme';
import router from './routes/mainroutes';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,

} from '@chakra-ui/react'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

