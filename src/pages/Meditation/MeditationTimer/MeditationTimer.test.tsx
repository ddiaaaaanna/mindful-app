import { render, screen, fireEvent, act } from "@testing-library/react";
import MeditationTimer from "./MeditationTimer";
import AppContextProvider from "../../../context/AppContext";

describe("MeditationTimer", () => {
  test("displays the selected meditation time", () => {
    const meditationTimer = 60;
    const mockSetMeditationStep = vi.fn();

    render(
      <AppContextProvider>
        <MeditationTimer
          meditationTimer={meditationTimer}
          setMeditationStep={mockSetMeditationStep}
        />
      </AppContextProvider>,
    );

    const timeLeft = screen.getByText("60");
    expect(timeLeft).toBeInTheDocument();
  });

  test("displays the selected meditation time", () => {
    const meditationTimer = 120;
    const mockSetMeditationStep = vi.fn();

    render(
      <AppContextProvider>
        <MeditationTimer
          meditationTimer={meditationTimer}
          setMeditationStep={mockSetMeditationStep}
        />
      </AppContextProvider>,
    );
    const timeLeft = screen.getByText("120");
    expect(timeLeft).toBeInTheDocument();
  });

  test("transitions to the completion step when the timer ends", () => {
    const meditationTimer = 1;
    const mockSetMeditationStep = vi.fn();
    vi.useFakeTimers();

    render(
      <AppContextProvider>
        <MeditationTimer
          meditationTimer={meditationTimer}
          setMeditationStep={mockSetMeditationStep}
        />
      </AppContextProvider>,
    );

    const startBtn = screen.getByText("Start");
    fireEvent.click(startBtn);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSetMeditationStep).toHaveBeenCalledWith("complete");
  });
});
