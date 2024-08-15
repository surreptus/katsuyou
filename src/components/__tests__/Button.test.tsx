import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("should render the button", () => {
    const screen = render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByText("Click me")).toBeDefined();
  });
});
