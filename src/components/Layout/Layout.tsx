import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "@emotion/styled";
import { Stack } from "../Stack";

const Navigation = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
`;

export const Content = styled.div`
  margin-bottom: 5rem;
`;

export const Container = styled(Stack)`
  max-width: 35rem;
  height: 100vh;
  margin: 0 auto;
  padding: 1rem;
  ${Content} {
    flex: 1;
  }

  ${Navigation} {
    flex: 0;
  }
`;

const Link = styled(RouterLink)`
  color: black;
  padding: 0.5rem 1rem;
  text-decoration: none;
  :hover {
    color: blue;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container direction="column">
      <Content>{children}</Content>
      <Navigation>
        <Link to="/">Practice</Link>
        <Link to="/vocabulary">Vocabulary</Link>
        <Link to="/settings">Settings</Link>
      </Navigation>
    </Container>
  );
}
