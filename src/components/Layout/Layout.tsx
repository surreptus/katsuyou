import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <div>{children}</div>
      <div className="flex">
        <Link to="/">Practice</Link>
        <Link to="/vocabulary">Vocabulary</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}
