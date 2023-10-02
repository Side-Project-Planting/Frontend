import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/GlobalStyle';
import GlobalFonts from './styles/GlobalFont';
import Header from './components/Header';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);
function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
