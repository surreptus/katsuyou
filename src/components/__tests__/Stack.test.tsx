import { render } from "@testing-library/react";
import { Stack } from "../Stack";
import { describe, expect, it } from "vitest";

describe("Stack", () => {
  it("should render row stack", () => {
    const screen = render(<Stack>Stack</Stack>);
    expect(screen.getByText("Stack")).toBeDefined();
  });
});
