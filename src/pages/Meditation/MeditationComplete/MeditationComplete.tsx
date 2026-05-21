import { useState, useContext } from "react";
import "./MeditationComplete.css";
import { AppContext } from "../../../context/AppContext";
import Notes from "../../Notes/Notes";

type MeditationCompleteType = {
  setMeditationStep: React.Dispatch<React.SetStateAction<string>>;
};

function MeditationComplete({ setMeditationStep }: MeditationCompleteType) {
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

    notes.push({
      text: noteText,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    });
    setNoteSaved(true);
    setNoteText("");

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  return (
    <div className="completion-container flex-center">
      {!noteSaved && (
        <div className="completion-content">
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
          </div>
        </div>
      )}

      {noteSaved && (
        <div className="completion-panel">
          <div className="completion-content">
            <p className="description">Your note was saved.</p>
            <div className="btn-container">
              <button
                className="action-btn"
                onClick={() => setMeditationStep("choose")}
              >
                Start over
              </button>
              <button className="action-btn" onClick={() => setActivePage("")}>
                Home
              </button>
            </div>
          </div>

          <div className="notes-history-container">
            <Notes />
          </div>
        </div>
      )}
    </div>
  );
}

export default MeditationComplete;
