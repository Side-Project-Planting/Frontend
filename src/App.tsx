import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
