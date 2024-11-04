import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />),
  },
  {
    path: "/about",
    element: (<div className='text-black'>About</div>),
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterProvider router={router} />
    </BrowserRouter>
  </StrictMode>,
)
