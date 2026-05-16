import "./Reflection.css";

type ReflectionProps = {
  setActivePage: (page: string) => void;
};

function Reflection({ setActivePage }: ReflectionProps) {
  return (
    <>
      <h1>REFLECTION</h1>
      <button onClick={() => setActivePage("")}>Home</button>
    </>
  );
}

export default Reflection;
