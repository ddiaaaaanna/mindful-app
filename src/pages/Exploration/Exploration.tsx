import "./Exploration.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Exploration() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;
  return (
    <>
      <h1>EXPLORATION</h1>
      <button onClick={() => setActivePage("")}>Home</button>
    </>
  );
}

export default Exploration;
