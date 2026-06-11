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
    <>
      {quotes.length === 0 && (
        <div className="empty-state flex-center">
          <p className="description">No quotes yet</p>
        </div>
      )}

      {quotes.map((quote) => (
        <div key={quote.id} className="quote-container">
          <p className="quote-author">{quote.author}</p>
          <p className="quote-text">{quote.text}</p>
          <button onClick={() => removeQuote(quote.id)}>x</button>
        </div>
      ))}
    </>
  );
}

export default Quotes;
