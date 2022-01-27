import styled from "styled-components/macro";

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid white;
  font-family: "BB";
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  margin: 2rem 20%;
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
    font-size: 2.5rem;
  }
`;

function Score() {
  return (
    <ScoreDiv>
      <div>
        <p>ROCK</p>
        <p>PAPER</p>
        <p>SCISSORS</p>
      </div>
      <ScoreCard>
        <p>
          SCORE <span>12</span>
        </p>
      </ScoreCard>
    </ScoreDiv>
  );
}

export default Score;
