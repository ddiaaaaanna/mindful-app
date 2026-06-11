import "./Reflection.css";
import { useState, useContext, useEffect } from "react";
import { TbCheckbox } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import Page from "../../components/Page/Page";
import { logActiveDay } from "../../utils/logActiveDay";
import { motion, AnimatePresence } from "framer-motion";

type PromptType = {
  originalPrompt: string;
  text: string;
  isEdited: boolean;
  promptId: number;
  answer: string;
  currentPrompt: string;
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
          currentPrompt: "",
        },
        {
          originalPrompt: "What has been draining your energy lately?",
          text: "What has been draining your energy lately?",
          isEdited: false,
          promptId: 2,
          answer: "",
          currentPrompt: "",
        },
        {
          originalPrompt: "What is something small you appreciated today?",
          text: "What is something small you appreciated today?",
          isEdited: false,
          promptId: 3,
          answer: "",
          currentPrompt: "",
        },
      ];
    }
  });

  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

  const [logJournal, setLogJournal] = useState<boolean>(false);
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

    filledAnswers.forEach((prompt) => {
      journalEntry.push({
        text: prompt.text,
        answer: prompt.answer,
        date: new Date().toLocaleDateString(),
        id: crypto.randomUUID(),
      });
    });

    localStorage.setItem("journalEntry", JSON.stringify(journalEntry));
    setPrompts(prompts.map((prompt) => ({ ...prompt, answer: "" })));
    setLogJournal(true);
    logActiveDay();
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
          return {
            ...prompt,
            isEdited: !prompt.isEdited,
            currentPrompt: !prompt.isEdited
              ? prompt.text
              : prompt.currentPrompt,
          };
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

  function cancelPrompt(index: number) {
    setPrompts(
      prompts.map((prompt, i) => {
        if (i === index) {
          return { ...prompt, isEdited: false, text: prompt.currentPrompt };
        }
        return prompt;
      }),
    );
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  function customizePrompts(): void {
    localStorage.setItem(
      "customPrompt",
      JSON.stringify(
        prompts.map((prompt) => ({
          text: prompt.text,
          originalPrompt: prompt.originalPrompt,
          promptId: prompt.promptId,
          answer: "",
          currentPrompt: "",
          isEdited: false,
        })),
      ),
    );
  }

  return (
    <div className="reflect-page">
      <Page
        title="REFLECT"
        description={
          !logJournal
            ? "Explore your thoughts through guided reflection"
            : undefined
        }
        animation="☀"
      >
        <AnimatePresence mode="wait">
          {!logJournal ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="prompt-container">
                {prompts.map((prompt, index) => (
                  <div key={index}>
                    <div className="prompt-controls">
                      {!prompt.isEdited ? (
                        <>
                          <span className="prompt-description">
                            {prompt.text}
                          </span>
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
                            <button
                              className="prompt-edit-btn"
                              onClick={() => cancelPrompt(index)}
                            >
                              <IoIosArrowRoundBack />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <textarea
                      className={`prompt-txtarea ${error ? "input-error" : ""}`}
                      onChange={(e) => {
                        (handlePromptChange(index, e.target.value),
                          setError(""));
                      }}
                      value={prompt.answer}
                    ></textarea>
                  </div>
                ))}
              </div>
              <button className="action-btn" onClick={() => saveEntry()}>
                Log to journal
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              className="completion-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="">
                <p className="description">Your entry was saved.</p>
                <div className="btn-container">
                  <button
                    className="action-btn"
                    onClick={() => setLogJournal(false)}
                  >
                    Journal again
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => setActivePage("journal")}
                  >
                    View Journal
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Page>
    </div>
  );
}

export default Reflection;
