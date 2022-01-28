import { useState } from "react";
import styled from "styled-components/macro";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import triangle from "../images/bg-triangle.svg";

const GamePiece = styled.button`
  padding: 1.5rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 16px solid var(--${(props) => props.color}, transparent);
  box-shadow: inset 0 5px hsl(217, 16%, 45%, 0.5),
    0 5px var(--${(props) => props.color}-shadow);
  background: url(${(props) => props.bg}) no-repeat center;
  background-color: white;

  img {
    margin: auto;
  }
`;

const GameOuter = styled.div`
  position: relative;
  margin: 3rem auto;
  width: 30%;
  height: 25rem;
  background: url(${triangle}) no-repeat center 75%;

  ${GamePiece}:first-child {
    position: absolute;
    top: 0;
    left: 0;
  }
  ${GamePiece}:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
  }
  ${GamePiece}:last-child {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const GameOuterActive = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 30%;
  margin: 1rem auto;

  & p {
    font-family: "BSB";
    margin-bottom: 1rem;
    color: white;
    text-align: center;
  }
`;

function Game() {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState({
    class: "",
    id: "",
  });
  const [randomP, setRandomP] = useState([]);

  let idArray = [1, 2, 3];

  const activeGame = (e) => {
    setActive(true);
    setSelected((prevState) => ({
      ...prevState,
      class: e.target.className,
      id: e.target.id,
    }));
    setRandomP(randomise(idArray[0], idArray[idArray.length - 1]));
    console.log(e.target.className);
  };
  console.log(randomP);

  const randomise = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };

  let randomColor, randomBg;
  if (randomP === 1) {
    randomColor = "paper";
    randomBg = paper;
  } else if (randomP === 2) {
    randomColor = "scissors";
    randomBg = scissors;
  } else if (randomP === 3) {
    randomColor = "rock";
    randomBg = rock;
  }

  return (
    <>
      {!active ? (
        <GameOuter>
          <GamePiece color="paper" bg={paper} id="1" onClick={activeGame} />
          <GamePiece
            color="scissors"
            bg={scissors}
            id="2"
            onClick={activeGame}
          />
          <GamePiece color="rock" bg={rock} id="3" onClick={activeGame} />
        </GameOuter>
      ) : (
        <GameOuterActive>
          <div>
            <p>YOU PICKED</p>
            <button className={selected.class} id={selected.id}></button>
          </div>
          <div>
            <p>THE HOUSE PICKED</p>
            <GamePiece
              className="theHouse"
              id={randomP}
              color={randomColor}
              bg={randomBg}
            />
          </div>
        </GameOuterActive>
      )}
    </>
  );
}

export default Game;
