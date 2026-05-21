import { useState } from "react";
import "./Meditation.css";
import MeditationTimer from "../Meditation/MeditationTimer/MeditationTimer.tsx";
import MeditationComplete from "./MeditationComplete/MeditationComplete.tsx";

type MeditationProps = {
  emoji: string;
};

type Duration = {
  label: string;
  value: number;
};

function Meditation({ emoji }: MeditationProps) {
  const [meditationTimer, setMeditationTimer] = useState<number>(0);
  const [meditationStep, setMeditationStep] = useState<string>("choose");

  const durations: Duration[] = [
    { label: "1 min", value: 60 },
    { label: "2 min", value: 120 },
    { label: "3 min", value: 180 },
  ];

  return (
    <>
      {meditationStep === "choose" && (
        <div className="meditation-page page">
          <div className="meditation-header flex-center">
            <h1>MEDITATION</h1>
          </div>

          <div className="meditation-page-content">
            <p className="meditation-card-description">
              Choose the duration of your practice
            </p>
            <div className="choice-btn-container flex-center">
              {durations.map((duration) => (
                <button
                  className={`meditation-choice-btn ${meditationTimer === duration.value ? "selected" : ""}`}
                  onClick={() => setMeditationTimer(duration.value)}
                  key={duration.value}
                >
                  {duration.label}
                </button>
              ))}
            </div>

            <p className="flex-center card-emoji">{emoji}</p>

            {meditationTimer > 0 && (
              <button
                className="action-btn"
                onClick={() => setMeditationStep("timer")}
              >
                Begin
              </button>
            )}
          </div>
        </div>
      )}
      {meditationStep === "timer" && (
        <MeditationTimer
          meditationTimer={meditationTimer}
          setMeditationStep={setMeditationStep}
        />
      )}

      {meditationStep === "complete" && (
        <MeditationComplete setMeditationStep={setMeditationStep} />
      )}
    </>
  );
}

export default Meditation;
