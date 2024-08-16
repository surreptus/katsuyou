import { describe, expect, it } from "vitest";
import { Settings } from "../Settings";
import { render } from "@testing-library/react";

describe("Settings", () => {
  it("should render", () => {
    const screen = render(<Settings />);

    expect(screen.getByText("Settings")).toBeDefined();
  });
});
