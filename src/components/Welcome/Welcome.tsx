import "./Welcome.css";

type userNameProps = {
  name: string | null;
};

function Welcome({ name }: userNameProps) {
  return (
    <>
      <h1>Welcome, {name} 𖤓</h1>
    </>
  );
}

export default Welcome;
