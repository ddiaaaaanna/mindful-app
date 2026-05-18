import { useState, useContext } from "react";
import "./MeditationComplete.css";
import { AppContext } from "../../../context/AppContext";

function MeditationComplete() {
  const [noteText, setNoteText] = useState<string>("");
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

  function saveNote(): void {
    const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    if (!noteText) {
      return;
    }

    notes.push({ text: noteText, date: new Date().toLocaleDateString() });
    setNoteSaved(true);
    setNoteText("");

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  return (
    <div className="completion-container">
      {!noteSaved && (
        <>
          <p className="description">
            Amazing! Take a moment to notice how you feel.
          </p>
          <div className="note-container">
            <textarea
              className="note-txtarea"
              placeholder="Reflect on how you felt during this session..."
              onChange={(e) => setNoteText(e.target.value)}
              value={noteText}
            ></textarea>
            <div className="btn-container flex-center">
              <button className="action-btn" onClick={() => saveNote()}>
                Save note
              </button>
              <button className="action-btn">Journal History</button>
            </div>
          </div>{" "}
        </>
      )}
      {noteSaved && (
        <div className="note-success-container">
          <p className="description">Your note was saved.</p>
          <button className="action-btn" onClick={() => setActivePage("")}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default MeditationComplete;
