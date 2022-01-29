import styled from "styled-components/macro";
import gameLogo from "../images/logo.svg";

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid white;
  font-family: "BB";
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  margin: 3rem 20%;
`;
const ScoreCard = styled.div`
  background-color: white;
  color: var(--score-text);
  border-radius: 0.5rem;
  padding: 0.5rem 2.5rem;
  text-align: center;

  span {
    display: block;
    color: var(--dark-text);
    font-size: 4rem;
    margin-top: -0.5rem;
  }
  p {
    margin: 0;
  }
`;

function Score({ score }) {
  return (
    <ScoreDiv>
      <div>
        <img src={gameLogo} alt="logo" />
      </div>
      <ScoreCard>
        <p>
          SCORE <span>{score}</span>
        </p>
      </ScoreCard>
    </ScoreDiv>
  );
}

export default Score;
export { ScoreDiv };
