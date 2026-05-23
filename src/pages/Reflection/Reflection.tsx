import "./Reflection.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Page from "../../components/Page/Page";

type PromptType = {
  text: string;
  isEdited: boolean;
};

function Reflection() {
  const [prompts, setPrompts] = useState<PromptType[]>([
    {
      text: "What emotion feels most present for you today?",
      isEdited: false,
    },
    {
      text: "What has been draining your energy lately?",
      isEdited: false,
    },
    {
      text: "What is something small you appreciated today?",
      isEdited: false,
    },
  ]);

  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

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
              <textarea className="prompt-txtarea"></textarea>
            </div>
          ))}
        </div>
        <button className="action-btn">Log to journal</button>
      </Page>
    </div>
  );
}

export default Reflection;
