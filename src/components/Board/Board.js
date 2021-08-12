import React, { useState, useEffect } from "react";
import { Card as CardWrapper } from "react-bootstrap";

import { checkerHasTwo, cardAlreadyClicked, checkCards } from "./boardUtils";
import Card from "../Card/Card";
import "./Board.css";

import { useDispatch, useSelector } from "react-redux";
import { win } from "../../store/features/game/gameSlice";

import { useInterval } from "../../hooks/useInterval";
import { increment } from "../../store/features/counter/counterSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Button from "../Button/Button";

const Board = (props) => {
  const END_GAME = 18;
  const [cards, setCards] = useState(props.cards);
  const [compareCards, setCompareCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.game.value);
  const [scoreIsVisible, setScoreIsVisible] = useState(false);

  const [results, setResults] = useLocalStorage("results", "");
  let tmp = results;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("results")) !== null) {
      // eslint-disable-next-line
      tmp = JSON.parse(localStorage.getItem("results"));
    }
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onCardClick = (card) => () => {
    if (checkerHasTwo(compareCards) || cardAlreadyClicked(compareCards, card))
      return;
    const newCheckers = [...compareCards, card];
    setCompareCards(newCheckers);
    const cardsInCheckersMatched = checkCards(newCheckers);
    if (cardsInCheckersMatched) {
      setMatchedCards([...matchedCards, newCheckers[0].name]);
    }
    if (checkerHasTwo(newCheckers)) {
      resetCheckersAfter(800);
    }

    function resetCheckersAfter(time) {
      setTimeout(() => {
        setCompareCards([]);
      }, time);
    }
  };

  useEffect(() => {
    if (matchedCards.length === END_GAME) {
      dispatch(win());
    }
    const newCards = cards.map((card) => ({
      ...card,
      flipped:
        compareCards.find((c) => c.id === card.id) ||
        matchedCards.includes(card.name),
    }));
    setCards(newCards);
    // eslint-disable-next-line
  }, [compareCards, matchedCards]);

  useInterval(() => {
    if (status === "playing") {
      dispatch(increment());
    }
  }, 1000);

  const submitScore = () => {
    tmp.length === 0
      ? (tmp = [{ name, score: props.count }])
      : (tmp = [...tmp, { name, score: props.count }]);
    setResults(tmp);
    setName("");
  };

  return (
    <div className="board">
      <CardWrapper
        className={status === "pause" ? "board-card invisible" : "board-card"}
      >
        {cards.map((card) => (
          <Card {...card} onClick={onCardClick(card)} key={card.id} />
        ))}
      </CardWrapper>
      {status === "win" && (
        <div className="win">
          <h3>Congratilations!! You win!!</h3>
          <div className="submit">
            <input value={name} onChange={handleChange} type="text" />
            <Button onClick={submitScore}>submit</Button>
          </div>
        </div>
      )}
      <div className="score">
        <Button onClick={() => setScoreIsVisible(true)}>show scores</Button>
        {scoreIsVisible &&
          (results.length === 0 ? (
            <div>no high scores yet...</div>
          ) : (
            results &&
            results.map((result, i) => (
              <div
                key={i}
              >{`name: ${result.name}, score: ${result.score}`}</div>
            ))
          ))}
      </div>
    </div>
  );
};

export default Board;
