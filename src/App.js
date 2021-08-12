import React from "react";
import { makeCards } from "./utils";
import Board from "./components/Board/Board";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pause, play } from "./store/features/game/gameSlice";
import Button from "./components/Button/Button";

function App() {
  const cards = makeCards();

  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.game.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>React Match Game</h1>
      <h1>Counter: {count}</h1>
      <div className="counter">
        {status === "stop" && (
          <Button onClick={() => dispatch(play())}>start</Button>
        )}
        {status === "pause" && count !== 0 && (
          <Button onClick={() => dispatch(play())}>resume</Button>
        )}
        {status === "playing" && (
          <Button onClick={() => dispatch(pause())}>pause</Button>
        )}
      </div>
      <div>{status !== "stop" && <Board cards={cards} count={count} />}</div>
    </div>
  );
}

export default App;
