import styled from "styled-components/macro";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import triangle from "../images/bg-triangle.svg";

const GamePiece = styled.button`
  padding: 1.5rem;
  border-radius: 50%;
  border: 16px solid var(--${(props) => props.color});
  box-shadow: inset 0 5px hsl(217, 16%, 45%, 0.5),
    0 5px var(--${(props) => props.color}-shadow);
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

function Game() {
  return (
    <>
      <GameOuter>
        <GamePiece color="paper">
          <img src={paper} alt="" />
        </GamePiece>
        <GamePiece color="scissors">
          <img src={scissors} alt="" />
        </GamePiece>
        <GamePiece color="rock">
          <img src={rock} alt="" />
        </GamePiece>
      </GameOuter>
    </>
  );
}

export default Game;
