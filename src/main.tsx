import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { css, Global } from "@emotion/react";

import { Router } from "./Router";
import { BACKGROUND } from "./theme/colors";
import { initializeStore } from "./store";

const globalStyles = css`
  body {
    background-color: ${BACKGROUND};
    touch-action: none;
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka,
      "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;

async function initialize() {
  await initializeStore();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Global styles={globalStyles} />
      <Router />
    </React.StrictMode>
  );
}

initialize();
