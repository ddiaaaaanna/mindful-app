import "./Home.css";
import Welcome from "../../components/Welcome/Welcome.tsx";
import WelcomeModal from "../../components/WelcomeModal/WelcomeModal.tsx";
import Card from "../../components/Card/Card.tsx";

type HomeTypes = {
  isName: string | null;
  setIsName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

function Home({
  isName,
  setIsName,
  setIsTransitioning,
  setActivePage,
}: HomeTypes) {
  return (
    <>
      {!isName && (
        <WelcomeModal
          setIsName={setIsName}
          setIsTransitioning={setIsTransitioning}
        />
      )}
      {isName && <Welcome name={isName} />}

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
    </>
  );
}

export default Home;
