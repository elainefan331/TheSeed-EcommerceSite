import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductIndex from '../components/ProductIndex';
import ProductDetailPage from '../components/ProductDetailPage';
import ManageProductPage from '../components/ManageProductPage';
import CreateProductPage from '../components/CreateProductPage';
import UpdateProductPage from '../components/UpdateProductPage';
import CheckoutPage from '../components/CheckoutPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductIndex />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />
      },
      {
        path: "/products/current",
        element: <ManageProductPage />
      },
      {
        path: "/products/new",
        element: <CreateProductPage />
      },
      {
        path: "/products/:productId/edit",
        element: <UpdateProductPage />
      },
      {
        path: "/products/checkout",
        element: <CheckoutPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);