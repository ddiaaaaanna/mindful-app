import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.tsx";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);

  return (
    <>
      {!isName && <WelcomeModal setIsName={setIsName} />}
      {isName && <Welcome name={isName} />}
    </>
  );
}

export default App;
