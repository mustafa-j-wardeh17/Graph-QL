import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store'
import Login from './pages/Login';
import './index.css'
import SuccessLogin from './pages/SuccessLogin';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import client from './../util/ApolloClients'
const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/login/success",
    element: (<SuccessLogin />),
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
)
