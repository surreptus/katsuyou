import { fireEvent, render } from "@testing-library/react";
import { Input } from "../Input";
import { describe, expect, it, vi } from "vitest";

describe("Input", () => {
  it("should render the input", () => {
    const screen = render(<Input />);
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("should render the input with placeholder", () => {
    const placeholder = "何を食べる？";
    const screen = render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });

  it("should render the input with value", () => {
    const value = "食べすぎる";
    const screen = render(<Input onChange={() => {}} value={value} />);
    expect(screen.getByDisplayValue(value)).toBeDefined();
  });

  it("should call the onChange function", () => {
    const onChange = vi.fn();
    const screen = render(<Input onChange={onChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "ラーメンを食べたい！" } });
    expect(onChange).toHaveBeenCalled();
  });
});
