import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/stores/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CardInfo } from './pages/CardInfo/CardInfo';
import { NotFoundpage } from './pages/CardInfo/404/NotFoundPage';
import { Cards } from './pages/Cards/Cards';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundpage />,
    children: [
      {
        path: '/',
        element: <Cards />,
      },
      {
        path: '/cards/:id',
        element: <CardInfo />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
