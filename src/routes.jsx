import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/shop',
    element: <ProductList />,
  },
  {
    path: '/products/:productId',
    element: <ProductDetails />,
  },
  {
    path: '/cart',
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: <Navigate to="/" replace />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
