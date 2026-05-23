import "./Reflection.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Page from "../../components/Page/Page";

type PromptType = {
  text: string;
  isEdited: boolean;
  promptId: number;
  answer: string;
};

function Reflection() {
  const [prompts, setPrompts] = useState<PromptType[]>([
    {
      text: "What emotion feels most present for you today?",
      isEdited: false,
      promptId: 1,
      answer: "",
    },
    {
      text: "What has been draining your energy lately?",
      isEdited: false,
      promptId: 2,
      answer: "",
    },
    {
      text: "What is something small you appreciated today?",
      isEdited: false,
      promptId: 3,
      answer: "",
    },
  ]);

  const [error, setError] = useState<string>("");

  function saveEntry(): void {
    const journalEntry = JSON.parse(
      localStorage.getItem("journalEntry") ?? "[]",
    );

    if (!prompts.some((prompt) => prompt.answer !== "")) {
      setError("");
      setTimeout(() => setError("Please enter a an entry"), 10);
      return;
    }

    const filledAnswers = prompts.filter((prompt) => prompt.answer !== "");

    journalEntry.push({
      text: filledAnswers,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    });

    localStorage.setItem("journalEntry", JSON.stringify(journalEntry));
    setPrompts(prompts.map((prompt) => ({ ...prompt, answer: "" })));
  }

  // const context = useContext(AppContext);
  // if (!context) return null;
  // const { setActivePage } = context;

  function handlePromptChange(index: number, value: string) {
    setPrompts(
      prompts.map((prompt, i) => {
        if (i === index) {
          return { ...prompt, answer: value };
        }
        return prompt;
      }),
    );
  }

  return (
    <div className="reflect-page">
      <Page
        title="REFLECT"
        description="Explore your thoughts through guided reflection"
      >
        <div className="prompt-container">
          {prompts.map((prompt, index) => (
            <div key={index}>
              <span className="prompt-description">{prompt.text}</span>
              <textarea
                className="prompt-txtarea"
                onChange={(e) => {
                  (handlePromptChange(index, e.target.value), setError(""));
                }}
                value={prompt.answer}
              ></textarea>
            </div>
          ))}
        </div>
        <button className="action-btn" onClick={() => saveEntry()}>
          Log to journal
        </button>
      </Page>
    </div>
  );
}

export default Reflection;
