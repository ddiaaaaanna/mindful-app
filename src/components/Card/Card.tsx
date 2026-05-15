import "./Card.css";

type CardProps = {
  title: string;
  emoji: string;
};

function Card({ title, emoji }: CardProps) {
  return (
    <div className="card-content">
      <p className="card-emoji">{emoji}</p>
      <h4 className="card-title">{title}</h4>
    </div>
  );
}

export default Card;
