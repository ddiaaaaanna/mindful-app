import { useState } from "react";
import "./WelcomeModal.css";

type nameProps = {
  setIsName: string | null;
};

function WelcomeModal({ setIsName }: nameProps) {
  const name: string | null = localStorage.getItem("name");
  const [userName, setUserName] = useState<string>(name || "");

  function saveName(): void {
    localStorage.setItem("name", userName);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    saveName();
    console.log(userName);
  }

  return (
    <div className="modal-container">
      <form className="welcome-modal" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <button>Enter</button>
      </form>
    </div>
  );
}

export default WelcomeModal;
