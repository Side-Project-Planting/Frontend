import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Main from './pages/Main';

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
  return <RouterProvider router={router} />;
}

export default App;
