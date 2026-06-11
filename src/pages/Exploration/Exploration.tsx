import "./Exploration.css";
import quotes from "../../data/quotes.json";
// import { useContext } from "react";
// import { AppContext } from "../../context/AppContext";
import Page from "../../components/Page/Page";

function Exploration() {
  const today = new Date();
  const year = today.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = Number(today) - Number(startOfYear);
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(diff / MS_PER_DAY);
  const todaysQuote = quotes[dayOfYear % quotes.length];

  function saveQuote(): void {
    const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes") ?? "[]");

    savedQuotes.push({
      author: todaysQuote.author,
      text: todaysQuote.quote,
      id: crypto.randomUUID(),
    });

    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
  }

  return (
    <>
      <Page title="EXPLORE" description="Thought of the day">
        <div className="quote-container">
          <p className="quote-author">{todaysQuote.author}</p>
          <p className="quote-text">{todaysQuote.quote}</p>
        </div>

        <button className="action-btn" onClick={() => saveQuote()}>
          Add to journal
        </button>
      </Page>
    </>
  );
}

export default Exploration;
