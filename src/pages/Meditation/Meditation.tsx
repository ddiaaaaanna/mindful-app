import "./Meditation.css";

type MeditationProps = {
  setActivePage: (page: string) => void;
};

function Meditation({ setActivePage }: MeditationProps) {
  return (
    <div className="meditation-page">
      <div className="meditation-header flex-center">
        <h1>MEDITATION</h1>
        <button className="home-btn" onClick={() => setActivePage("")}>
          Home
        </button>
      </div>

      <div className="meditation-page-content flex-center">
        <button className="meditation-choice-btn">1 min</button>
        <button className="meditation-choice-btn">2 min</button>
        <button className="meditation-choice-btn">3 min</button>
      </div>
    </div>
  );
}

export default Meditation;
