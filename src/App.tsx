import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.tsx";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal.tsx";
import Card from "./components/Card/Card.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);

  return (
    <>
      {!isName && <WelcomeModal setIsName={setIsName} />}
      {isName && <Welcome name={isName} />}

      <div className="card-container">
        <Card title={"Meditate"} emoji={"꩜"} />
        <Card title={"Reflect"} emoji={"꥟"} />
        <Card title={"Explore"} emoji={"❀"} />
      </div>
    </>
  );
}

export default App;
