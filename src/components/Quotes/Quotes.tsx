import { useState } from "react";
import "./Quotes.css";

type Quote = {
  author: string;
  text: string;
  id: string;
};

function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>(
    JSON.parse(localStorage.getItem("savedQuotes") ?? "[]"),
  );

  function removeQuote(id: string) {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id);
    setQuotes(updatedQuotes);

    localStorage.setItem("savedQuotes", JSON.stringify(updatedQuotes));
  }

  return (
    <div className="quotes-container">
      <div className="container-header">
        <p className="description">Your quotes</p>
      </div>

      {quotes.length === 0 && (
        <div className="empty-state flex-center">
          <p className="description">No quotes yet</p>
        </div>
      )}

      {quotes.map((quote) => (
        <div key={quote.id} className="journal-quote-container">
          <div className="quote-content">
            <p className="journal-quote quote-author">{quote.author}</p>
            <p className="journal-quote quote-text">{quote.text}</p>
          </div>
          <div className="quote-action">
            <button
              className="note-del-btn"
              onClick={() => removeQuote(quote.id)}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Quotes;
