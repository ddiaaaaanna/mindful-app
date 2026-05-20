import { useState } from "react";
import "./WelcomeModal.css";

type WelcomeModalProps = {
  setIsName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
};

function WelcomeModal({ setIsName, setIsTransitioning }: WelcomeModalProps) {
  const name: string | null = localStorage.getItem("name");
  const [userName, setUserName] = useState<string>(name || "");
  const [error, setError] = useState<string>("");

  function saveName(): void {
    localStorage.setItem("name", userName);
  }

  function withTransition(action: () => void) {
    document.body.style.cursor = "wait";
    setIsTransitioning(true);
    setTimeout(() => {
      action();
      setIsTransitioning(false);
      document.body.style.cursor = "default";
    }, 1000);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userName) {
      setError("");
      setTimeout(() => setError("Please enter your name"), 10);
      return;
    }

    withTransition(() => {
      saveName();
      setIsName(userName);
    });
  }

  function anonUser() {
    withTransition(() => {
      localStorage.setItem("name", "anonymous");
      setIsName("anonymous");
    });
  }

  return (
    <div className="modal-container flex-center">
      <h1>mindful-app</h1>
      <div className="modal-content">
        <form className="welcome-modal" onSubmit={handleSubmit}>
          <input
            className={error ? "input-error" : ""}
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              (setUserName(e.target.value), setError(""));
            }}
            value={userName}
          />
          <button className="modal-main-btn">Enter</button>
        </form>
        <button className="anonymous-btn" onClick={anonUser}>
          Continue without name
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
