import "./MeditationTimer.css";
import { useEffect, useState } from "react";

type MeditationTimerProps = {
  meditationTimer: number;
};

function MeditationTimer({ meditationTimer }: MeditationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(meditationTimer);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const containerClass = `timer-container ${hasStarted && timeLeft > 0 ? "border-glow" : ""} ${timerActive ? "running" : ""}`;

  useEffect(() => {
    if (timerActive) {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [timerActive]);

  return (
    <div className="timer-page flex-center">
      <div className={containerClass}>
        <p className="timer-description">
          Focus on your breath. Notice your thoughts, observe them, don't fight
          them. When your mind wanders, gently return to the present.
        </p>

        <div className="btn-container">
          {!timerActive && (
            <button
              className="action-btn flex-center"
              onClick={() => {
                setTimerActive(true);
                setHasStarted(true);
              }}
            >
              Start
            </button>
          )}

          {timerActive && (
            <button
              className="action-btn flex-center"
              onClick={() => setTimerActive(false)}
            >
              Pause
            </button>
          )}
          {hasStarted && (
            <button
              className="action-btn flex-center"
              onClick={() => {
                setTimeLeft(meditationTimer);
                setTimerActive(false);
                setHasStarted(false);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <p className="flex-center card-emoji">{timeLeft}</p>
        {timeLeft === 0 && <p>completed</p>}
      </div>
    </div>
  );
}

export default MeditationTimer;
