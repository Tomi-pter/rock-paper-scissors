import { useState } from "react";
import Score from "./components/Score";
import Game from "./components/Game";
import Rules from "./components/Rules";

function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <Score score={score} setScore={setScore} />
      <Game score={score} setScore={setScore} />
      <Rules />
    </>
  );
}

export default App;
