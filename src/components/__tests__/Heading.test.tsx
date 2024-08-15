import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Heading } from "../Heading";

describe("Heading", () => {
  it("should render the heading", () => {
    const screen = render(<Heading>Heading</Heading>);

    expect(screen.getByText("Heading")).toBeDefined();
  });
});
