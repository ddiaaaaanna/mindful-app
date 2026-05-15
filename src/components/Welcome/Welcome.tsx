import "./Welcome.css";

type userNameProps = {
  name: string | null;
};

function Welcome({ name }: userNameProps) {
  return (
    <>
      {name === "anonymous" ? <h1>Welcome ⏾</h1> : <h1>Welcome, {name} 𖤓</h1>}
    </>
  );
}

export default Welcome;
