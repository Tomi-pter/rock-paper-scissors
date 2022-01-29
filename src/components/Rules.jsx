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
  color: white;
  border: 1px solid white;
  border-radius: 0.35rem;
  font-family: "BSB";
  display: block;

  &.clicked {
    display: none;
    height: 0;
    width: 0;
  }
`;

const RulesImg = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: auto;
  background-color: white;
  margin: 10% auto 0;
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

  @media screen and (max-height: 850px) {
    margin: 50vh auto 0;
  }
`;

const Dim = styled.div`
  background-color: rgb(0, 0, 0, 0.75);
  width: 100vw;
  height: 150vh;
  z-index: 10;
  transform: translateX(1%) translateY(-100%);
  position: fixed;
`;

function Rules() {
  const [ruleDisplay, setRuleDisplay] = useState({
    clicked: false,
    class: "",
  });

  const displayRule = () => {
    setRuleDisplay((prevState) => ({
      ...prevState,
      clicked: true,
      class: "clicked",
    }));
  };

  const removeRule = () => {
    setRuleDisplay((prevState) => ({
      ...prevState,
      clicked: false,
      class: "",
    }));
  };

  return (
    <BtnDiv>
      <RulesBtn onClick={displayRule} className={ruleDisplay.class}>
        RULES
      </RulesBtn>
      {ruleDisplay.clicked && (
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
          <Dim />
        </>
      )}
    </BtnDiv>
  );
}

export default Rules;
