import "./MeditationComplete.css";

type MeditationCompleteProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

function MeditationComplete({ setActivePage }: MeditationCompleteProps) {
  return (
    <div className="completion-container">
      <p className="description">
        Amazing! Take a moment to notice how you feel.
      </p>

      <div className="note-container">
        <textarea
          className="note-txtarea"
          placeholder="Reflect on how you felt during this session..."
        ></textarea>
        <div className="btn-container flex-center">
          <button className="action-btn">Save note</button>
          <button className="action-btn">Journal History</button>
        </div>
      </div>
    </div>
  );
}

export default MeditationComplete;
