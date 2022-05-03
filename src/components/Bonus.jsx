// import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { GamePiece } from "./Game";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import lizard from "../images/icon-lizard.svg";
import spock from "../images/icon-spock.svg";
import pentagon from "../images/bg-pentagon.svg";

const BonusOuter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  background: url(${pentagon}) no-repeat center/40vw 30vh;
  margin: 3rem auto;
  max-width: 50%;
  height: 70vh;

  @media screen and (max-width: 700px) {
    grid-gap: 0;

    .scissors {
      margin-left: 0.25rem;
    }
  }

  @media screen and (min-height: 1024px) {
    height: 40vh;
  }

  @media screen and (max-height: 1024px) {
    background: url(${pentagon}) no-repeat center/40vw 60vh;

    .scissors {
      align-self: start;
    }
    .paper,
    .spock {
      align-self: start;
      margin-top: -2rem;
    }
  }

  .scissors {
    grid-column: 2/3;
    grid-row: 1/2;
    justify-self: center;
  }
  .paper {
    grid-column: 3/4;
    grid-row: 2/3;
    justify-self: end;
  }
  .rock {
    grid-column: 3/4;
    grid-row: 3/4;
    justify-self: start;
  }
  .lizard {
    grid-column: 1/2;
    grid-row: 3/4;
    justify-self: end;
  }
  .spock {
    grid-column: 1/2;
    grid-row: 2/3;
    justify-self: start;
  }

  @media screen and (max-width: 1024px) {
    max-width: 60%;
    height: 50vh;
    background: url(${pentagon}) no-repeat center/50vw 40vh;
  }
`;

function Bonus({ activeGame }) {
  return (
    <>
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
    </>
  );
}

export default Bonus;
export { BonusOuter };
