import { useState } from "react";
import "./WelcomeModal.css";

type nameProps = {
  setIsName: React.Dispatch<React.SetStateAction<string | null>>;
};

function WelcomeModal({ setIsName }: nameProps) {
  const name: string | null = localStorage.getItem("name");
  const [userName, setUserName] = useState<string>(name || "");

  function saveName(): void {
    localStorage.setItem("name", userName);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    document.body.style.cursor = "wait";
    setTimeout(() => {
      saveName();
      setIsName(userName);
      document.body.style.cursor = "default";
    }, 1000);
  }

  function anonUser() {
    document.body.style.cursor = "wait";
    setTimeout(() => {
      localStorage.setItem("name", "anonymous");
      setIsName("anonymous");
      document.body.style.cursor = "default";
    }, 1000);
  }

  return (
    <>
      <div className="modal-container">
        <h1>mindful-app</h1>
        <div className="modal-content">
          <form className="welcome-modal" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <button className="modal-main-btn">Enter</button>
          </form>
          <button className="anonymous-btn" onClick={anonUser}>
            Continue without name
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomeModal;
