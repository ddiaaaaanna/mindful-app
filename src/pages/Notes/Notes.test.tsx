import { render, screen, fireEvent } from "@testing-library/react";
import Notes from "./Notes.tsx";

describe("Notes", () => {
  test("empty state shown when no notes available", () => {
    localStorage.clear();

    render(<Notes />);

    expect(screen.getByText("No notes yet")).toBeInTheDocument();
  });

  test("removes note after clicking delete", () => {
    localStorage.setItem(
      "notes",
      JSON.stringify([
        { text: "Test note", date: "5/21/2026", id: 1, time: 60 },
      ]),
    );

    render(<Notes />);
    const button = screen.getByText("x");
    fireEvent.click(button);

    expect(screen.getByText("No notes yet")).toBeInTheDocument();
  });

  test("shows notes from localStorage", () => {
    localStorage.setItem(
      "notes",
      JSON.stringify([
        { text: "Test note", date: "5/21/2026", id: 1, time: 60 },
      ]),
    );
    render(<Notes />);

    expect(screen.getByText("Test note")).toBeInTheDocument();
  });
});
