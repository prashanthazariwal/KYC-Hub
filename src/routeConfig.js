import CompareProducts from "./pages/CompareProducts";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";

export const routes = [
  {
    path: "/",
    element: ProductDetails,
    title: "Product Details",
  },
  {
    path: "/compare",
    element: CompareProducts,
    title: "Compare Products",
  },
  {
    path: "*",
    element: NotFound,
    title: "404 Not Found",
  },
];
