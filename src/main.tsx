import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import { css, Global } from "@emotion/react";

const globalStyles = css`
  body {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ",
      Meiryo, "ＭＳ Ｐゴシック", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <Router />
  </React.StrictMode>
);
