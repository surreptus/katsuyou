import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/settings",
      lazy: async () => {
        const { Settings } = await import("./pages/Settings");
        return { Component: Settings };
      },
    },
    {
      path: "/",
      lazy: async () => {
        const { Practice } = await import("./pages/Practice");
        return { Component: Practice };
      },
    },
    {
      path: "/vocabulary",
      lazy: async () => {
        const { Vocabulary } = await import("./pages/Vocabulary");
        return { Component: Vocabulary };
      },
    },
    {
      path: "/vocabulary/:slug",
      lazy: async () => {
        const { Show } = await import("./pages/Vocabulary");
        return { Component: Show };
      },
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export const Router = () => RouterProvider({ router });
