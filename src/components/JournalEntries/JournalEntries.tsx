import { useState } from "react";
import "./JournalEntries.css";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Entry = {
  text: string;
  answer: string;
  date: string;
  id: string;
};

function JournalEntry() {
  const [entries, setEntries] = useState<Entry[]>(
    JSON.parse(localStorage.getItem("journalEntry") ?? "[]"),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const visibleNotes = entries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(entries.length / entriesPerPage);

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

  function removeEntry(id: string) {
    const updatedEntry = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntry);

    localStorage.setItem("journalEntry", JSON.stringify(updatedEntry));
  }

  return (
    <div className="box-container">
      <div className="container-header">
        <p className="description">Your journal entries</p>
      </div>

      <div className="notes-page ">
        <motion.div layout className="notes-container">
          {entries.length === 0 && (
            <div className="empty-state flex-center">
              <p className="description">No entries yet</p>
            </div>
          )}

          <div className="notes-list">
            <AnimatePresence mode="wait">
              {visibleNotes.map((entry: Entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.25 },
                    layout: { duration: 0.3 },
                  }}
                >
                  <div className="note-content" key={entry.id}>
                    <div className="note-text">
                      <p className="note-topic">{entry.answer}</p>
                      <div className="session-details">
                        <p className="note-details">{entry.date}</p>
                        <span className="note-details">•</span>
                        <p className="note-details">{entry.text}</p>
                      </div>
                    </div>

                    <div className="note-action">
                      <button
                        className="note-del-btn"
                        onClick={() => removeEntry(entry.id)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {entries.length > 0 && (
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
    </div>
  );
}

export default JournalEntry;
