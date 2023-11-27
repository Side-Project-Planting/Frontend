import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
