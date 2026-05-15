import "./Welcome.css";

type userNameProps = {
  name: string | null;
};

function Welcome({ name }: userNameProps) {
  return (
    <>
      {name === "anonymous" ? (
        <h1 className="main-title">Welcome ⏾</h1>
      ) : (
        <h1 className="main-title">Welcome, {name} 𖤓</h1>
      )}

      <p className="main-subtitle">
        A mindfulness app for short daily check-ins. Choose an exercise, spend a
        few minutes with yourself, and jot down what you notice.
      </p>
    </>
  );
}

export default Welcome;
