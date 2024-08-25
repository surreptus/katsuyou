import React from "react";
import { initializeStore } from "./store";

interface AppProps {
  children: React.ReactNode;
}

export function App({ children }: AppProps) {
  initializeStore();
  return children;
}
