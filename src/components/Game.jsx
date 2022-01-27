import styled from "styled-components/macro";

const GamePiece = styled.button`
  padding: 3rem;
  border-radius: 50%;
  border: 16px solid var(--${(props) => props.color});
`;

const GameOuter = styled.div`
  position: relative;
  margin: auto;
  border: 2px red solid;
  width: 40%;
  height: 70vh;

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
    left: 30%;
  }
`;
function Game() {
  return (
    <>
      <GameOuter>
        <GamePiece color="rock">rock</GamePiece>
        <GamePiece color="paper">paper</GamePiece>
        <GamePiece color="scissors">scissors</GamePiece>
      </GameOuter>
    </>
  );
}

export default Game;
