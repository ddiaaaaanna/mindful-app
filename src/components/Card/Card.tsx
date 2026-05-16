import { useState } from "react";
import "./Card.css";

type CardProps = {
  title: string;
  emoji: string;
  description: string;
};

function Card({ title, emoji, description }: CardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="card-content"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
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
