import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@components/Header';
import { queryClient } from '@components/react-query/queryClient';
import CreatePlan from '@pages/CreatePlan';
import GoogleOauthCallback from '@pages/GoogleOauthCallback';
import Invite from '@pages/Invite';
import Main from '@pages/Main';
import Plan from '@pages/Plan';
import Setting from '@pages/Setting';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import GlobalStyle from '@styles/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
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
  {
    path: '/main',
    element: (
      <Layout>
        <Main />,
      </Layout>
    ),
  },
  {
    path: '/create-plan',
    element: (
      <Layout>
        <CreatePlan />,
      </Layout>
    ),
  },
  {
    path: '/plan/:planId',
    element: (
      <Layout>
        <Plan />,
      </Layout>
    ),
  },
  {
    path: '/plan',
    element: (
      <Layout>
        <Plan />,
      </Layout>
    ),
  },
  {
    path: '/setting',
    element: (
      <Layout>
        <Setting />,
      </Layout>
    ),
  },
  {
    path: '/invite/:uuid',
    element: (
      <Layout>
        <Invite />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
