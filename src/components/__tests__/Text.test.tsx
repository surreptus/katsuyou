import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "../Text";

describe("Text", () => {
  it("should render the text", () => {
    const screen = render(<Text>Text</Text>);

    expect(screen.getByText("Text")).toBeDefined();
  });
});
