import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter, createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import App from './app/app';
import Task from './app/pages/task';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task",
    element: <Task />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    {/*<BrowserRouter>*/}
    {/*  <App />*/}
    {/*</BrowserRouter>*/}
    <RouterProvider router={router} />
  </StrictMode>
);
