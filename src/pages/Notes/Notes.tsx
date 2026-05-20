import { useState } from "react";
import "./Notes.css";
import { AnimatePresence, motion } from "framer-motion";

type Note = {
  text: string;
  date: number;
  id: number;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("notes") ?? "[]"),
  );

  function removeNote(id: number) {
    const updatedNote = notes.filter((_, index) => index !== id);
    setNotes(updatedNote);

    localStorage.setItem("notes", JSON.stringify(updatedNote));
  }

  return (
    <div className="page notes-page flex-center">
      <motion.div layout className="notes-container">
        {notes.length === 0 && <p className="description">No notes yet</p>}

        <AnimatePresence mode="popLayout">
          {notes &&
            notes.map((note: Note, index: number) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.25 },
                  layout: { duration: 0.3 },
                }}
              >
                <div className="note-content">
                  <div className="note-text">
                    <p className="note-topic">{note.text}</p>
                    <p className="note-date">{note.date}</p>
                  </div>

                  <div className="note-action">
                    <button
                      className="note-del-btn"
                      onClick={() => removeNote(index)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Notes;
