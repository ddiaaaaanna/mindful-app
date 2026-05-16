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
        <Card
          title={"Meditate"}
          emoji={"꩜"}
          description={
            "Ground yourself in the present. Choose 1, 3, or 5 minutes of stillness."
          }
        />
        <Card
          title={"Reflect"}
          emoji={"꥟"}
          description={"Log your mood and see how you feel over time."}
        />
        <Card
          title={"Explore"}
          emoji={"❀"}
          description={"Discover a new mindfulness quote each day."}
        />
      </div>
    </>
  );
}

export default App;
