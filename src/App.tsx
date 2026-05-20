import { useState, useContext } from "react";
import "./App.css";
import Meditation from "./pages/Meditation/Meditation.tsx";
import Reflection from "./pages/Reflection/Reflection.tsx";
import Exploration from "./pages/Exploration/Exploration.tsx";
import Transition from "./components/Transition/Transition.tsx";
import Home from "./pages/Home/Home.tsx";
import { AppContext } from "./context/AppContext.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) return null;
  const { activePage } = context;

  return (
    <>
      {isTransitioning && <Transition />}

      {isName && <Navigation />}

      {!activePage && (
        <Home
          isName={isName}
          setIsName={setIsName}
          setIsTransitioning={setIsTransitioning}
        />
      )}

      {activePage === "meditate" && <Meditation emoji={"꩜"} />}
      {activePage === "reflect" && <Reflection />}
      {activePage === "explore" && <Exploration />}
    </>
  );
}

export default App;
