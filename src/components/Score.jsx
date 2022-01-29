import styled from "styled-components/macro";
import gameLogo from "../images/logo.svg";

const ScoreDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  font-family: "BB";
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  margin: 3rem 20%;

  @media screen and (max-width: 1024px) {
    margin: 3rem 10%;

    img {
      max-width: clamp(4rem, 6rem, 9rem);
    }
  }
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

  @media screen and (max-width: 1024px) {
    padding: 0.5rem;

    span {
      font-size: clamp(2rem, 3rem, 4rem);
    }
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
