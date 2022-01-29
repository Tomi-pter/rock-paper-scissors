import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import triangle from "../images/bg-triangle.svg";

const GamePiece = styled.button`
  padding: 1.5rem;
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  border: 16px solid var(--${(props) => props.color}, transparent);
  box-shadow: inset 0 5px hsl(217, 16%, 45%, 0.5),
    0 5px var(--${(props) => props.color}-shadow);
  background: url(${(props) => props.bg}) no-repeat center/3.5vw;
  background-color: white;

  @media screen and (max-width: 1024px) {
    border: 13px solid var(--${(props) => props.color}, transparent);
    max-width: 25vw;
    max-height: 25vh;
    background: url(${(props) => props.bg}) no-repeat center/2rem;
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
    height: 30vh;
    background: url(${triangle}) no-repeat center/clamp(30vw, 55vw, 60vw)
      clamp(20vh, 25vh, 29vh);
  }

  //@media screen and (min-width: 451px) and (max-width: 1024px) {
  //  background: url(${triangle}) no-repeat center/40vw clamp(25vh, 30vh, 33vh);
  //}

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
`;

function Game({ score, setScore }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState({
    class: "",
    id: "",
  });
  const [no, setNo] = useState(0);
  const [randomP, setRandomP] = useState([]);
  const [dispNum, setDispNum] = useState(0);
  const colorRef = useRef("");
  const bgRef = useRef("");
  const scoreRef = useRef("");
  const totalRef = useRef("");

  let idArray = [1, 2, 3];

  const randomise = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };

  const activeGame = (e) => {
    setSelected((prevState) => ({
      ...prevState,
      class: e.target.className,
      id: e.target.id,
    }));
    setRandomP(randomise(idArray[0], idArray[idArray.length - 1]));
    setActive(true);
  };

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
    }
  }, [no, randomP, active]);

  const winner = (select, rId) => {
    let result;
    if (!rId) {
      result = "the house is picking...";
    } else if (select - 1 === rId) {
      result = "You win";
    } else if (select - 1 === rId - 1) {
      result = "Stalemate";
    } else if (select === 1 && rId === 3) {
      result = "You win";
    } else {
      result = "You lose";
    }
    return result;
  };

  if (scoreRef.current === "Stalemate") {
    setScore(dispNum ? dispNum : 0);
    totalRef.current = score;
  } else if (scoreRef.current === "You win") {
    setScore(dispNum + 1);
    totalRef.current = score;
  } else if (scoreRef.current === "You lose") {
    setScore(dispNum - 1);
    totalRef.current = score;
  }

  useEffect(() => {
    setDispNum(totalRef.current);
    scoreRef.current = "";
  }, [active]);

  const playAgain = () => {
    setActive(false);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("the house has picked");
      console.log(score);
    }, 0);
  }, [randomP, selected.id, score]);

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
          <div className="outcome">
            <p>{(scoreRef.current = winner(+selected.id, no))}</p>
            <OutcomeBtn onClick={playAgain}>Play again</OutcomeBtn>
          </div>
          <div>
            <p>THE HOUSE PICKED</p>
            <GamePiece
              ref={colorRef}
              className="theHouse"
              id={randomP}
              color={colorRef.current}
              bg={bgRef.current}
            />
          </div>
        </GameOuterActive>
      )}
    </>
  );
}

export default Game;
