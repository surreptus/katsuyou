import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Practice } from "./pages/Practice";
import { Settings } from "./pages/Settings";
import { Vocabulary } from "./pages/Vocabulary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Practice />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/vocabulary",
    element: <Vocabulary />,
  },
]);

export const Router = () => RouterProvider({ router });
