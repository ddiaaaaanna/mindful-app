import "./Exploration.css";

type ExplorationProps = {
  setActivePage: (page: string) => void;
};

function Exploration({ setActivePage }: ExplorationProps) {
  return (
    <>
      <h1>EXPLORATION</h1>
      <button onClick={() => setActivePage("")}>Home</button>
    </>
  );
}

export default Exploration;
