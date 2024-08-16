import { describe, expect, it } from "vitest";
import { Show } from "../Show";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Settings", () => {
  it("should render", () => {
    const slug = "調べる";

    const screen = render(
      <MemoryRouter initialEntries={[{ pathname: `/vocabulary/${slug}` }]}>
        <Routes>
          <Route path="/vocabulary/:slug" element={<Show />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(slug)).toBeDefined();
  });
});
