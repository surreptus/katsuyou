import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Practice } from "./pages/Practice";
import { Settings } from "./pages/Settings";
import { Vocabulary } from "./pages/Vocabulary";
import { Show } from "./pages/Vocabulary/Show";

const router = createBrowserRouter(
  [
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
    {
      path: "/vocabulary/:slug",
      element: <Show />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export const Router = () => RouterProvider({ router });
