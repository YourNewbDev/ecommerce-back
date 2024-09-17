import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./pages/Product.tsx";
import Category from "./pages/Category.tsx";

const queryClient = new QueryClient()

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: 'signin',
    element: <Signin/>,
  },
  {
    path: 'product',
    element: <Product/>,
  },
  {
    path: 'category',
    element: <Category/>,
  },


])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
