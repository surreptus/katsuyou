import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "normalize.css";
import "./index.css";

import { App } from "./App";
import { Router } from "./Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback="Loading">
      <App>
        <Router />
      </App>
    </Suspense>
  </React.StrictMode>
);
