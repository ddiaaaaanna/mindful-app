import "./Welcome.css";

type WelcomeProps = {
  name: string | null;
};

function Welcome({ name }: WelcomeProps) {
  return (
    <>
      <h1 className="main-title">
        {name === "anonymous" ? "Welcome ⏾" : `Welcome, ${name} 𖤓`}
      </h1>

      <p className="main-subtitle">
        A mindfulness app for short daily check-ins. Choose an exercise, spend a
        few minutes with yourself, and jot down what you notice.
      </p>
    </>
  );
}

export default Welcome;
