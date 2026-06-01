import "./Reflection.css";
import { useState } from "react";
import { TbCheckbox } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

import Page from "../../components/Page/Page";

type PromptType = {
  originalPrompt: string;
  text: string;
  isEdited: boolean;
  promptId: number;
  answer: string;
};

function Reflection() {
  const [prompts, setPrompts] = useState<PromptType[]>(() => {
    const customPrompts = localStorage.getItem("customPrompt");

    if (customPrompts) {
      const editedPrompts = JSON.parse(customPrompts);
      return editedPrompts;
    } else {
      return [
        {
          originalPrompt: "What emotion feels most present for you today?",
          text: "What emotion feels most present for you today?",
          isEdited: false,
          promptId: 1,
          answer: "",
        },
        {
          originalPrompt: "What has been draining your energy lately?",
          text: "What has been draining your energy lately?",
          isEdited: false,
          promptId: 2,
          answer: "",
        },
        {
          originalPrompt: "What is something small you appreciated today?",
          text: "What is something small you appreciated today?",
          isEdited: false,
          promptId: 3,
          answer: "",
        },
      ];
    }
  });

  const [error, setError] = useState<string>("");

  function saveEntry(): void {
    const journalEntry = JSON.parse(
      localStorage.getItem("journalEntry") ?? "[]",
    );

    if (!prompts.some((prompt) => prompt.answer !== "")) {
      setError("");
      setTimeout(() => setError("Please enter an entry"), 10);
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

  function togglePromptEdit(index: number) {
    setPrompts(
      prompts.map((prompt, i) => {
        if (i === index) {
          return { ...prompt, isEdited: !prompt.isEdited, text: prompt.text };
        }
        return prompt;
      }),
    );
  }

  function editPrompt(index: number, value: string) {
    setPrompts(
      prompts.map((prompt, i) => {
        if (i === index) {
          return { ...prompt, text: value };
        }
        return prompt;
      }),
    );
  }

  function customizePrompts(): void {
    localStorage.setItem(
      "customPrompt",
      JSON.stringify(
        prompts.map((prompt) => ({
          text: prompt.text,
          originalPrompt: prompt.originalPrompt,
          promptId: prompt.promptId,
        })),
      ),
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
                {!prompt.isEdited ? (
                  <>
                    <span className="prompt-description">{prompt.text}</span>
                    <button
                      className="prompt-edit-btn"
                      onClick={() => togglePromptEdit(index)}
                    >
                      <MdOutlineEdit />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      autoFocus
                      className="prompt-editor"
                      value={prompt.text}
                      onChange={(e) => editPrompt(index, e.target.value)}
                    />
                    <div className="flex-center">
                      <button
                        className="prompt-edit-btn"
                        onClick={() => {
                          (customizePrompts(), togglePromptEdit(index));
                        }}
                      >
                        <TbCheckbox />
                      </button>
                      <button className="prompt-edit-btn">
                        <IoIosArrowRoundBack />
                      </button>
                    </div>
                  </>
                )}
              </div>

              <textarea
                className={`prompt-txtarea ${error ? "input-error" : ""}`}
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
