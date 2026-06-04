import { useState } from "react";
import "./Notes.css";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Note = {
  text: string;
  date: string;
  id: number;
  time: number;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("notes") ?? "[]"),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const visibleNotes = notes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const pageAmount = Array(totalPages).fill(1);

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function removeNote(id: number) {
    const updatedNote = notes.filter((note) => note.id !== id);
    setNotes(updatedNote);

    localStorage.setItem("notes", JSON.stringify(updatedNote));
  }

  return (
    <div className="notes-page ">
      {notes.length > 0 && <p className="description">Your notes</p>}
      <motion.div layout className="notes-container">
        {notes.length === 0 && (
          <div className="empty-state flex-center">
            <p className="description">No notes yet</p>
          </div>
        )}

        <div className="notes-list">
          <AnimatePresence mode="popLayout">
            {visibleNotes.map((note: Note) => (
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
                <div className="note-content" key={note.id}>
                  <div className="note-text">
                    <p className="note-topic">{note.text}</p>
                    <div className="session-details">
                      <p className="note-details">{note.date}</p>
                      <span className="note-details">•</span>
                      <p className="note-details">{note.time / 60 + "min"}</p>
                    </div>
                  </div>

                  <div className="note-action">
                    <button
                      className="note-del-btn"
                      onClick={() => removeNote(note.id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notes.length > 0 && (
          <div className="pagination-btn-container">
            <button
              className={currentPage === 1 ? "unavailable" : ""}
              onClick={prevPage}
            >
              <MdKeyboardArrowLeft />
            </button>
            <div className="page-amount-container">
              {pageAmount.map((_, index) => (
                <span key={`page-dot-${index}`} className="page-dot">
                  {index + 1 === currentPage ? "●" : "○"}
                </span>
              ))}
            </div>
            <button
              className={currentPage === totalPages ? "unavailable" : ""}
              onClick={nextPage}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Notes;
