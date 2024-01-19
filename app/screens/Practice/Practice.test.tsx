import React from "react";
import { PracticeScreen } from ".";
import {
  screen,
  render,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import lessons from "../../data/verbs.json";

const mockLesson = lessons[0];

jest.mock("./helpers", () => ({
  getNextLesson: () => mockLesson,
}));

describe("PracticeScreen", () => {
  it("renders correctly", () => {
    renderScreen();

    expect(screen.getByText("Past")).toBeOnTheScreen();
    expect(screen.getByText("Polite")).toBeOnTheScreen();
    expect(screen.getByRole("button")).toHaveTextContent("Get Hint");
  });

  it("should add the red styling when the incorrect answer is entered", async () => {
    renderScreen();

    const input = screen.getByPlaceholderText("Guess");

    const user = userEvent.setup();
    await user.type(input, "Derp");

    expect(screen.getByDisplayValue("Derp")).toHaveStyle({ color: "red" });
  });

  it("should add the green styling when the correct answer is entered", async () => {
    renderScreen();

    const input = screen.getByPlaceholderText("Guess");

    const user = userEvent.setup();
    await user.type(input, mockLesson.slug);

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockLesson.slug)).toHaveStyle({
        color: "green",
      });
    });
  });

  it("should show the buttons when correct", async () => {
    renderScreen();

    const input = screen.getByPlaceholderText("Guess");

    const user = userEvent.setup();
    await user.type(input, mockLesson.slug);

    const buttons = await screen.findAllByRole("button");

    expect(buttons.length).toBe(4);
  });

  function renderScreen() {
    render(<PracticeScreen navigation={{}} />);
  }
});
