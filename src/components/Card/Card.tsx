import { useState } from "react";
import "./Card.css";

type CardProps = {
  title: string;
  emoji: string;
  description: string;
  onClick: () => void;
};

function Card({ title, emoji, description, onClick }: CardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="card-content flex-center"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={onClick}
    >
      {!isActive ? (
        <>
          <p className="card-emoji">{emoji}</p>
          <h4 className="card-title">{title}</h4>
        </>
      ) : (
        <p className="card-description">{description}</p>
      )}
    </div>
  );
}

export default Card;
