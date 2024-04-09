import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductIndex from '../components/ProductIndex';
import ProductDetailPage from '../components/ProductDetailPage';
import ManageProductPage from '../components/ManageProductPage';
import CreateProductPage from '../components/CreateProductPage';
import UpdateProductPage from '../components/UpdateProductPage';
import CheckoutPage from '../components/CheckoutPage';
import OrderHistoryPage from '../components/OrderHistoryPage';
import SmallPage from '../components/CollectionPages/SmallPage';
import MediumPage from '../components/CollectionPages/MediumPage';
import LargePage from '../components/CollectionPages/LargePage';
import BloomPage from '../components/CollectionPages/BloomPage';
import GiftPage from '../components/CollectionPages/GiftPage';
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
        path: "/orders",
        element: <OrderHistoryPage />
      },
      {
        path: "/small",
        element: <SmallPage />
      },
      {
        path: "/medium",
        element: <MediumPage />
      },
      {
        path: "/large",
        element: <LargePage />
      },
      {
        path: "/blooms",
        element: <BloomPage />
      },
      {
        path: "/gifts",
        element: <GiftPage />
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