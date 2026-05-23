import "./Home.css";
import Welcome from "../../components/Welcome/Welcome.tsx";
import WelcomeModal from "../../components/WelcomeModal/WelcomeModal.tsx";
import Card from "../../components/Card/Card.tsx";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.tsx";

type HomeProps = {
  isName: string | null;
  setIsName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
};

function Home({ isName, setIsName, setIsTransitioning }: HomeProps) {
  const context = useContext(AppContext);
  if (!context) return null;
  const { setActivePage } = context;

  return (
    <>
      {!isName && (
        <WelcomeModal
          setIsName={setIsName}
          setIsTransitioning={setIsTransitioning}
        />
      )}
      {isName && (
        <div className="welcome-page">
          <Welcome name={isName} />

          <div className="card-container flex-center">
            <Card
              title={"Meditate"}
              emoji={"꩜"}
              description={
                "Ground yourself in the present. Choose 1, 3, or 5 minutes of stillness."
              }
              onClick={() => setActivePage("meditate")}
            />
            <Card
              title={"Reflect"}
              emoji={"꥟"}
              description={"Log your mood and see how you feel over time."}
              onClick={() => setActivePage("reflect")}
            />
            <Card
              title={"Explore"}
              emoji={"❀"}
              description={"Discover a new mindfulness quote each day."}
              onClick={() => setActivePage("explore")}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
