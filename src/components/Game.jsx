import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import triangle from "../images/bg-triangle.svg";
import lizard from "../images/icon-lizard.svg";
import spock from "../images/icon-spock.svg";
import Toggle from "./Toggle";
import { BonusOuter } from "./Bonus";

// styled components
const GamePiece = styled.button`
  padding: 1.5rem;
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  border: 16px solid var(--${(props) => props.$color}, transparent);
  box-shadow: inset 0 5px hsl(217, 16%, 45%, 0.5),
    0 5px var(--${(props) => props.$color}-shadow);
  background: url(${(props) => props.bg}) no-repeat center/3.5vw;
  background-color: white;
  color: transparent;
  transform: ${(props) => (props.animate === true ? "scale(1)" : "scale(0)")};
  transition: transform 1s ease-in-out;

  .hide {
    visibility: hidden;
    height: 0;
    width: 0;
  }
  @media screen and (max-width: 1024px) {
    border: 13px solid var(--${(props) => props.$color}, transparent);
    max-width: 25vw;
    max-height: 25vh;
    background: url(${(props) => props.bg}) no-repeat center/2rem;
    background-color: white;
  }

  @media screen and (max-width: 700px) {
    background: url(${(props) => props.bg}) no-repeat center/1.5rem;
    background-color: white;
  }
`;

const GameOuter = styled.div`
  position: relative;
  margin: 3rem auto;
  max-width: 30%;
  height: 50vh;
  background: url(${triangle}) no-repeat center/20vw clamp(30vh, 37vh, 37.2vh);

  @media screen and (max-width: 1024px) {
    max-width: 60%;
    height: 32.5vh;
    background: url(${triangle}) no-repeat center/clamp(30vw, 55vw, 60vw)
      clamp(20vh, 25vh, 29vh);
  }

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
  max-width: 45%;
  margin: 1rem auto;

  & p {
    font-family: "BSB";
    margin-bottom: 1rem;
    color: white;
    text-align: center;
  }

  & .outcome {
    display: flex;
    flex-direction: column;
  }

  & .outcome > p {
    font-family: "BB";
    text-transform: uppercase;
    font-size: 3rem;
  }

  & .outcome {
    opacity: ${(props) => (props.animate === true ? "1" : "0")};
    transition: opacity 500ms ease-in 1.5s;
  }

  & .userDiv button {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      animation: ${(props) =>
        props.gameActive === true
          ? (props) => (props.champ === "user" ? "declareWinner 1.5s" : "none")
          : "none"};
      animation-fill-mode: forwards;
      animation-delay: 1.5s;
    }
  }

  & .theHouse {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      animation: ${(props) =>
        props.gameActive === true
          ? (props) => (props.champ === "house" ? "declareWinner 1.5s" : "none")
          : "none"};
      animation-fill-mode: forwards;
      animation-delay: 1.5s;
    }
  }

  /* ripple effect animation */
  @keyframes declareWinner {
    33% {
      box-shadow: 0 6px 0 60px rgba(255, 255, 255, 0.025);
    }
    66% {
      box-shadow: 0 6px 0 60px rgba(255, 255, 255, 0.025),
        0 6px 0 calc((60px) * 2 + 5px) rgba(255, 255, 255, 0.025);
    }
    100% {
      box-shadow: 0 6px 0 60px rgba(255, 255, 255, 0.025),
        0 6px 0 calc((60px) * 2 + 5px) rgba(255, 255, 255, 0.025),
        0 6px 0 calc((60px) * 3 + 25px) rgba(255, 255, 255, 0.025);
    }
  }

  @media screen and (max-width: 1024px) {
    max-width: 80%;
    height: 30vh;
    margin: auto;

    & p {
      font-size: 0.8rem;
    }
    & .outcome {
      margin: 0 0.5rem;
    }

    & .outcome > p {
      font-size: 1rem;
    }

    & .houseContainer {
      margin-top: -1rem;
    }
  }
`;

const OutcomeBtn = styled.button`
  padding: 0.5rem 3rem;
  margin: 0.5rem auto;
  color: var(--dark-text);
  background-color: white;
  text-transform: uppercase;
  border-radius: 0.25rem;
  font-family: "BB";
  border: 1px solid white;
  box-shadow: 2px 2px 2.5px rgba(0, 0, 0, 0.25);
  transition: transform 250ms, color 250ms;

  :hover {
    color: rgba(255, 0, 0, 0.5);
    transform: translateY(2px);
  }

  @media screen and (max-width: 1024px) {
    padding: 0.5rem 2rem;
    margin: 0.5rem;
  }
`;

function Game({ score, setScore, setScoreChange }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState({
    class: "",
    id: "",
  });
  const [no, setNo] = useState(0);
  const [randomP, setRandomP] = useState([]);
  const [dispNum, setDispNum] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedMode, setSelectedMode] = useState(false);
  const colorRef = useRef("");
  const bgRef = useRef("");
  const scoreRef = useRef("");
  const totalRef = useRef("");

  let idArray = [1, 2, 3];
  let idArrayBonus = [1, 2, 3, 4, 5];

  // Randomise function
  const randomise = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };

  // Function to put the game into active mode and select the move of the house
  const activeGame = (e) => {
    setSelected((prevState) => ({
      ...prevState,
      class: e.target.className,
      id: e.target.id,
    }));

    if (selectedMode) {
      setRandomP(
        randomise(idArrayBonus[0], idArrayBonus[idArrayBonus.length - 1])
      );
    } else {
      setRandomP(randomise(idArray[0], idArray[idArray.length - 1]));
    }
    setActive(true);
    setScoreChange(!active);
    setTimeout(() => {
      setIsAnimated(true);
    }, 500);
  };

  // sets styling for the house
  useEffect(() => {
    if (randomP === 1) {
      colorRef.current = "paper";
      bgRef.current = paper;
      setNo(1);
    } else if (randomP === 2) {
      colorRef.current = "scissors";
      bgRef.current = scissors;
      setNo(2);
    } else if (randomP === 3) {
      colorRef.current = "rock";
      bgRef.current = rock;
      setNo(3);
    } else if (randomP === 4) {
      colorRef.current = "lizard";
      bgRef.current = lizard;
      setNo(4);
    } else if (randomP === 5) {
      colorRef.current = "spock";
      bgRef.current = spock;
      setNo(5);
    }
  }, [no, randomP, active]);

  // function to decide winner of the contest
  const winner = (select, rId) => {
    let result;
    if (selectedMode) {
      if (!rId) {
        result = "the house is picking...";
      } else if (
        (select === 1 && (rId === 3 || rId === 5)) ||
        (select === 2 && (rId === 1 || rId === 4)) ||
        (select === 3 && (rId === 2 || rId === 4)) ||
        (select === 4 && (rId === 1 || rId === 5)) ||
        (select === 5 && (rId === 2 || rId === 3))
      ) {
        result = "You win";
      } else if (select === rId) {
        result = "Stalemate";
      } else if (
        (select === 1 && (rId === 2 || 4)) ||
        (select === 2 && (rId === 3 || 5)) ||
        (select === 3 && (rId === 1 || 5)) ||
        (select === 4 && (rId === 2 || 3)) ||
        (select === 5 && (rId === 1 || 4))
      ) {
        result = "You lose";
      } else {
        result = "You lose";
      }
    } else {
      if (!rId) {
        result = "the house is picking...";
      } else if (
        (select === 1 && rId === 3) ||
        (select === 2 && rId === 1) ||
        (select === 3 && rId === 2)
      ) {
        result = "You win";
      } else if (select === rId) {
        result = "Stalemate";
      } else {
        result = "You lose";
      }
    }
    let resultShadow =
      result && result === "You win"
        ? "user"
        : result === "You lose"
        ? "house"
        : "draw";
    return [result, resultShadow];
  };

  // communicates result with user
  setTimeout(() => {
    if (scoreRef.current === "Stalemate") {
      setScore(+dispNum);
    } else if (scoreRef.current === "You win") {
      setScore(+dispNum + 1);
    } else if (scoreRef.current === "You lose") {
      setScore(+dispNum - 1);
    }
  }, 2500);

  useEffect(() => {
    totalRef.current = score;
  }, [score]);

  const updateScore = () => {
    setDispNum(totalRef.current);
    scoreRef.current = "";
  };

  // play again function
  const playAgain = () => {
    setActive(false);
    setScoreChange(!active);
    setIsAnimated(false);
    updateScore();
  };

  const solved = () => {
    return (scoreRef.current = winner(+selected.id, no)[0]);
  };

  let champion = winner(+selected.id, no)[1];

  return (
    <>
      <Toggle setSelectedMode={setSelectedMode} active={active} />
      {!active ? (
        <>
          {!selectedMode ? (
            <GameOuter>
              <GamePiece
                $color="paper"
                bg={paper}
                id="1"
                onClick={activeGame}
                animate={true}
              >
                paper
              </GamePiece>
              <GamePiece
                $color="scissors"
                bg={scissors}
                id="2"
                onClick={activeGame}
                animate={true}
              >
                scissors
              </GamePiece>
              <GamePiece
                $color="rock"
                bg={rock}
                id="3"
                onClick={activeGame}
                animate={true}
              >
                rock
              </GamePiece>
            </GameOuter>
          ) : (
            <BonusOuter>
              <GamePiece
                $color="scissors"
                bg={scissors}
                id="2"
                animate={true}
                className="scissors"
                onClick={activeGame}
              >
                scissors
              </GamePiece>
              <GamePiece
                $color="paper"
                bg={paper}
                id="1"
                animate={true}
                className="paper"
                onClick={activeGame}
              >
                paper
              </GamePiece>
              <GamePiece
                $color="rock"
                bg={rock}
                id="3"
                animate={true}
                className="rock"
                onClick={activeGame}
              >
                rock
              </GamePiece>
              <GamePiece
                $color="lizard"
                bg={lizard}
                id="4"
                animate={true}
                className="lizard"
                onClick={activeGame}
              >
                lizard
              </GamePiece>
              <GamePiece
                $color="spock"
                bg={spock}
                id="5"
                animate={true}
                className="spock"
                onClick={activeGame}
              >
                spock
              </GamePiece>
            </BonusOuter>
          )}
        </>
      ) : (
        <GameOuterActive
          animate={isAnimated}
          champ={champion}
          gameActive={isAnimated}
        >
          <div className="userDiv">
            <p>YOU PICKED</p>
            <button
              className={selected.class}
              id={selected.id}
              disabled
            ></button>
          </div>
          <div className="outcome">
            <p className="result">{solved()}</p>
            <OutcomeBtn onClick={playAgain}>Play again</OutcomeBtn>
          </div>
          <div className="houseContainer">
            <p>THE HOUSE PICKED</p>
            <GamePiece
              ref={colorRef}
              className="theHouse"
              id={randomP}
              $color={colorRef.current}
              bg={bgRef.current}
              animate={isAnimated}
              disabled
            />
          </div>
        </GameOuterActive>
      )}
    </>
  );
}

export default Game;
export { GamePiece };
