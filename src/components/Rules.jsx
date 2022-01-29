import styled from "styled-components";
import rules from "../images/image-rules.svg";
import closeBtn from "../images/icon-close.svg";
import { useState } from "react";

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0.5rem 1rem 0;

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;

const RulesBtn = styled.button`
  background-color: rgb(255, 255, 255, 0);
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  color: white;
  border: 1px solid white;
  border-radius: 0.35rem;
  font-family: "BSB";
`;

const RulesImg = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: auto;
  background-color: white;
  margin: 0 auto;
  top: 25vh;
  transform: translateY(-175%);
  padding: 0 2rem 1rem;
  border-radius: 0.5rem;
  z-index: 20;
  position: relative;

  h1 {
    font-size: 1.4rem;
  }
  .headClose {
    display: flex;
    justify-content: space-between;
    font-family: "BB";
    align-items: center;
  }
  button {
    padding: 0;
    height: 1.5rem;
    border: none;
    background-color: transparent;
  }
  img {
    max-width: 15rem;
    margin: auto;
  }
`;

function Rules() {
  const [ruleDisplay, setRuleDisplay] = useState(false);

  const displayRule = () => {
    setRuleDisplay(true);
  };

  const removeRule = () => {
    setRuleDisplay(false);
  };

  return (
    <BtnDiv>
      <RulesBtn onClick={displayRule}>RULES</RulesBtn>
      {ruleDisplay && (
        <>
          <RulesImg>
            <div className="headClose">
              <h1>RULES</h1>
              <button onClick={removeRule}>
                <img src={closeBtn} alt="close" />
              </button>
            </div>
            <img src={rules} alt="" />
          </RulesImg>
        </>
      )}
    </BtnDiv>
  );
}

export default Rules;
