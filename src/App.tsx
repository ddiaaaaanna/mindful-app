import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.tsx";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal.tsx";
import Card from "./components/Card/Card.tsx";
import Meditation from "./pages/Meditation/Meditation.tsx";
import Reflection from "./pages/Reflection/Reflection.tsx";
import Exploration from "./pages/Exploration/Exploration.tsx";
import Transition from "./components/Transition/Transition.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);
  const [activePage, setActivePage] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  console.log(activePage);

  return (
    <>
      {isTransitioning && <Transition />}
      {!activePage && (
        <>
          {!isName && (
            <WelcomeModal
              setIsName={setIsName}
              setIsTransitioning={setIsTransitioning}
            />
          )}
          {isName && <Welcome name={isName} />}

          <div className="card-container flex-center">
            <Card
              title={"Meditate"}
              emoji={"꩜"}
              description={
                "Ground yourself in the present. Choose 1, 3, or 5 minutes of stillness."
              }
              onClick={() => setActivePage("meditate")}
            />
            <Card
              title={"Reflect"}
              emoji={"꥟"}
              description={"Log your mood and see how you feel over time."}
              onClick={() => setActivePage("reflect")}
            />
            <Card
              title={"Explore"}
              emoji={"❀"}
              description={"Discover a new mindfulness quote each day."}
              onClick={() => setActivePage("explore")}
            />
          </div>
        </>
      )}

      {activePage === "meditate" && (
        <Meditation setActivePage={setActivePage} emoji={"꩜"} />
      )}
      {activePage === "reflect" && <Reflection setActivePage={setActivePage} />}
      {activePage === "explore" && (
        <Exploration setActivePage={setActivePage} />
      )}
    </>
  );
}

export default App;
