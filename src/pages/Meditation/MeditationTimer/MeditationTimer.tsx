import "./MeditationTimer.css";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

type MeditationTimerProps = {
  meditationTimer: number;
  setMeditationStep: React.Dispatch<React.SetStateAction<string>>;
};

function MeditationTimer({
  meditationTimer,
  setMeditationStep,
}: MeditationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(meditationTimer);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) return null;
  const { timerActive, setTimerActive } = context;

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

  useEffect(() => {
    if (timeLeft === 0) {
      setMeditationStep("complete");
      setTimerActive(false);
    }
  }, [timeLeft]);

  return (
    <div className="timer-page flex-center">
      <div className={containerClass}>
        {timeLeft > 0 && (
          <>
            <p className="timer-description">
              Focus on your breath. Notice your thoughts, observe them, don't
              fight them. When your mind wanders, gently return to the present.
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
                <>
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
                  <button
                    className="action-btn flex-center"
                    onClick={() => {
                      setTimeLeft(0);
                      setTimerActive(false);
                      setMeditationStep("complete");
                    }}
                  >
                    End session
                  </button>
                </>
              )}
            </div>
            <p className="flex-center card-emoji">{timeLeft}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MeditationTimer;
