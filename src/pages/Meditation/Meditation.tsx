import { useState } from "react";
import "./Meditation.css";
import MeditationTimer from "../Meditation/MeditationTimer/MeditationTimer.tsx";
import MeditationComplete from "./MeditationComplete/MeditationComplete.tsx";
import Page from "../../components/Page/Page.tsx";

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
        <>
          <Page
            title="MEDITATION"
            description="Choose the duration of your practice"
          >
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

            <p className="flex-center emoji-animation">{emoji}</p>

            {meditationTimer > 0 && (
              <button
                className="action-btn begin-btn"
                onClick={() => setMeditationStep("timer")}
              >
                Begin
              </button>
            )}
          </Page>
        </>
      )}
      {meditationStep === "timer" && (
        <MeditationTimer
          meditationTimer={meditationTimer}
          setMeditationStep={setMeditationStep}
        />
      )}

      {meditationStep === "complete" && (
        <MeditationComplete
          setMeditationStep={setMeditationStep}
          meditationTimer={meditationTimer}
        />
      )}
    </>
  );
}

export default Meditation;
