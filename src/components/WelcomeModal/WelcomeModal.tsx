// import { useRef } from "react";
import { use, useState } from "react";
import "./WelcomeModal.css";

function WelcomeModal() {
  const name: string | null = localStorage.getItem("name");

  // const [modalRef, setModalRef] = useRef<string>("");
  const [userName, setUserName] = useState<string>(name || "");

  function saveName(): void {
    localStorage.setItem("name", userName);
  }

  console.log(userName);

  function handleSubmit(e: any) {
    e.preventDefault();
    saveName();
  }

  return (
    // add useRef? why?
    <form className="welcome-modal" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <button>Enter</button>
    </form>
  );
}

export default WelcomeModal;
