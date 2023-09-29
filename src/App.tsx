import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/GlobalStyle';
import GlobalFonts from './styles/GlobalFont';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
