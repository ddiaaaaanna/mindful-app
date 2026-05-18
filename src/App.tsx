import { useState } from "react";
import "./App.css";
import Meditation from "./pages/Meditation/Meditation.tsx";
import Reflection from "./pages/Reflection/Reflection.tsx";
import Exploration from "./pages/Exploration/Exploration.tsx";
import Transition from "./components/Transition/Transition.tsx";
import Home from "./pages/Home/Home.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);
  const [activePage, setActivePage] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  return (
    <>
      {isTransitioning && <Transition />}

      {!activePage && (
        <Home
          isName={isName}
          setIsName={setIsName}
          setIsTransitioning={setIsTransitioning}
          setActivePage={setActivePage}
        />
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
