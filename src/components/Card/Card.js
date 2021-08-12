import React from "react";
import "./Card.css";

const Card = (props) => {
  const { cardFront, cardBack, flipped, onClick } = props;
  const img = flipped ? cardFront : cardBack;
  return (
    <div className="match-card" onClick={onClick}>
      <img className="match-card-pic" src={img} alt="" />
    </div>
  );
};

export default Card;
