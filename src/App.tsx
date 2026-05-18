import { useState, useContext } from "react";
import "./App.css";
import Meditation from "./pages/Meditation/Meditation.tsx";
import Reflection from "./pages/Reflection/Reflection.tsx";
import Exploration from "./pages/Exploration/Exploration.tsx";
import Transition from "./components/Transition/Transition.tsx";
import Home from "./pages/Home/Home.tsx";
import { AppContext } from "./context/AppContext.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage, activePage } = context;

  return (
    <>
      {isTransitioning && <Transition />}

      {!activePage && (
        <Home
          isName={isName}
          setIsName={setIsName}
          setIsTransitioning={setIsTransitioning}
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
