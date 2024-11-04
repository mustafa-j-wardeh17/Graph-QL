import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App';
import { Provider } from 'react-redux';
import { store } from '../redux/store'
import Login from './pages/Login';
import './index.css'
import SuccessLogin from './pages/SuccessLogin';
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
