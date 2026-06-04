import { useState, useContext } from "react";
import "./App.css";
import Meditation from "./pages/Meditation/Meditation.tsx";
import Reflection from "./pages/Reflection/Reflection.tsx";
import Exploration from "./pages/Exploration/Exploration.tsx";
import Transition from "./components/Transition/Transition.tsx";
import Home from "./pages/Home/Home.tsx";
import { AppContext } from "./context/AppContext.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import { AnimatePresence, motion } from "framer-motion";
import Notes from "./pages/Notes/Notes.tsx";
import Journal from "./pages/Journal/Journal.tsx";
import Settings from "./pages/Settings/Settings.tsx";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isName, setIsName] = useState<string | null>(name);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) return null;
  const { activePage, timerActive } = context;

  return (
    <>
      {isTransitioning && <Transition />}

      <AnimatePresence>
        {isName && !timerActive && (
          <motion.div
            key="nav"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 100,
            }}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

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
      {activePage === "notes" && <Notes />}
      {activePage === "journal" && <Journal />}
      {activePage === "settings" && <Settings />}
    </>
  );
}

export default App;
