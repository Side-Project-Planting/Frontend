import React from 'react';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '@components/Header';
import CreatePlan from '@pages/CreatePlan';
import GoogleOauthCallback from '@pages/GoogleOauthCallback';
import Main from '@pages/Main';
import Plan from '@pages/Plan';
import Setting from '@pages/Setting';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import GlobalFonts from '@styles/GlobalFont';
import GlobalStyle from '@styles/GlobalStyle';

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
    children: [
      // 헤더를 포함한 페이지는 children 안에 경로를 지정해주세요.
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/create-plan',
        element: <CreatePlan />,
      },
      {
        path: '/plan',
        element: <Plan />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
    ],
  },
  // 헤더를 포함하지 않은 페이지는 children 밖에 놓아주세요.
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login/oauth2/code/google?',
    element: <GoogleOauthCallback />,
  },
]);
function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
