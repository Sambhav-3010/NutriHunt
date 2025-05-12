import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductSearch from "./pages/ProductSearch.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <ProductSearch />,
  },
  {
    path: "/product/:code",
    element: <ProductDetails />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
