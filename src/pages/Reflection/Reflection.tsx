import "./Reflection.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Reflection() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

  return (
    <>
      <h1>REFLECTION</h1>
      <button onClick={() => setActivePage("")}>Home</button>
    </>
  );
}

export default Reflection;
