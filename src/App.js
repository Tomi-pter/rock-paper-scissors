import { useState } from "react";
import styled from "styled-components/macro";
import Score from "./components/Score";
import Game from "./components/Game";
import Rules from "./components/Rules";

//const Heading = styled.h1`
//  color: white;
//  font-family: "BB";
//  font-size: 1.5rem;
//  text-align: center;
//  text-transform: uppercase;
//  margin-bottom: 0.5rem;
//`;

const ResetDiv = styled.div`
  display: flex;
  margin: 1rem 0.5rem 1rem 0;
  justify-content: center;
`;

const ResetBtn = styled.button`
  background-color: rgb(255, 255, 255, 0);
  padding: 0.5rem 2rem;
  color: white;
  border: 1px solid white;
  border-radius: 0.35rem;
  font-family: "BSB";
  display: block;
  text-transform: uppercase;
`;

function App() {
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(false);

  const resetGame = () => {
    window.location.reload();
    return false;
  };

  return (
    <>
      {/*<Heading>Single player Rock, Paper, Scissors game</Heading>*/}
      <Score score={score} setScore={setScore} scoreChange={scoreChange} />
      <Game score={score} setScore={setScore} setScoreChange={setScoreChange} />
      <ResetDiv>
        <ResetBtn onClick={resetGame}>Reset</ResetBtn>
      </ResetDiv>
      <Rules />
    </>
  );
}

export default App;
