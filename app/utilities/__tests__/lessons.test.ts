import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLessons } from "../../screens/Practice/helpers";
import lessons from "../../data/lessons.json";
import { act, renderHook, waitFor } from "@testing-library/react-native";

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => ({
  useAsyncStorage: () => ({
    getItem: mockGetItem,
    setItem: mockSetItem,
  }),
}));

describe("useLessons", () => {
  it("it should load the current lessons", () => {
    renderHook(() => useLessons());

    expect(mockGetItem).toHaveBeenCalled;
  });

  it("should select the first overdue lesson if it exists", async () => {
    mockGetItem.mockReturnValueOnce(
      JSON.stringify([
        {
          dueAt: new Date(1970, 1, 1),
          id: 100,
        },
      ])
    );

    const { result } = renderHook(() => useLessons());

    await waitFor(() => {
      expect(result.current.currentLesson).toBe(lessons[100]);
    });
  });

  it("should create a new lesson if none are workable", () => {});
});
