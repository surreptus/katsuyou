import React from "react";
import { PracticeScreen } from ".";
import { screen, render } from "@testing-library/react-native";

describe("PracticeScreen", () => {
  it("renders correctly", () => {
    render(<PracticeScreen navigation={{}} />);
    expect(screen.getByText("Past")).toBeOnTheScreen();
    expect(screen.getByText("Polite")).toBeOnTheScreen();
  });
});
