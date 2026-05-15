import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeModal from "./WelcomeModal";

describe("WelcomeModal", () => {
  test("saves name to localStorage on submit", () => {
    vi.useFakeTimers();

    const mockSetIsName = vi.fn();

    render(<WelcomeModal setIsName={mockSetIsName} />);

    const input = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(input, { target: { value: "Marnie" } });

    const button = screen.getByText("Enter");
    fireEvent.click(button);
    vi.runAllTimers();

    expect(localStorage.getItem("name")).toBe("Marnie");
  });

  test("saves anonymous to localStorage when continuing without name", () => {
    vi.useFakeTimers();

    const anonymousMock = vi.fn();

    render(<WelcomeModal setIsName={anonymousMock} />);

    const anonButton = screen.getByText("Continue without name");
    fireEvent.click(anonButton);
    vi.runAllTimers();

    expect(localStorage.getItem("name")).toBe("anonymous");
  });
});
