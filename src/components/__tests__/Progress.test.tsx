import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Progress } from "../Progress";

describe("Progress", () => {
  it("should render the progress", () => {
    const screen = render(<Progress value={50} />);

    const element = screen.getByRole("progressbar");

    expect(element).toBeDefined();
  });
});
