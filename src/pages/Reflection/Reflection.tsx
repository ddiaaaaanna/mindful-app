import "./Reflection.css";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
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

  console.log(error);

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
        animation="☀"
      >
        {/* <div className="sun-decoration">☀</div> */}
        <div className="prompt-container">
          {prompts.map((prompt, index) => (
            <div key={index}>
              <div className="prompt-controls">
                <span className="prompt-description">{prompt.text}</span>
                <button className="prompt-edit-btn">
                  <MdOutlineEdit />
                </button>
              </div>

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
