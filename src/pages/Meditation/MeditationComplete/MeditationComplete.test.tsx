import { render, screen, fireEvent } from "@testing-library/react";
import MeditationComplete from "./MeditationComplete";
import AppContextProvider from "../../../context/AppContext";

describe("MeditationComplete", () => {
  test("Notes saved to localStorage", () => {
    const mockSetMeditationStep = vi.fn();
    const meditationTimer = 1;

    render(
      <AppContextProvider>
        <MeditationComplete
          meditationTimer={meditationTimer}
          setMeditationStep={mockSetMeditationStep}
        />
      </AppContextProvider>,
    );

    const textarea = screen.getByPlaceholderText(
      "Reflect on how you felt during this session...",
    );
    fireEvent.change(textarea, { target: { value: "Great!" } });
    const button = screen.getByText("Save note");
    fireEvent.click(button);

    const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");
    expect(notes[0].text).toBe("Great!");
  });
});
