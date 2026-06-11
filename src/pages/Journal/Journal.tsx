import Calendar from "../../components/Calendar/Calendar";
import JournalEntry from "../../components/JournalEntries/JournalEntries";
import Quotes from "../../components/Quotes/Quotes";
import Notes from "../Notes/Notes";
import "./Journal.css";

function Journal() {
  return (
    <div className="journal-container flex-center">
      <div>
        <h1 className="journal-title">Journal</h1>
      </div>
      <div className="journal-content">
        <Notes />
        <JournalEntry />
        <Calendar />
        <Quotes />
      </div>
    </div>
  );
}

export default Journal;
