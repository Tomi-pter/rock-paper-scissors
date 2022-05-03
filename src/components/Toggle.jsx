import { useState, useEffect } from "react";
import styled from "styled-components/macro";

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin: 0 0.5rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  :hover {
    opacity: 0.6;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      hsl(236, 72%, 79%),
      hsl(237, 63%, 64%)
    );
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:focus + .slider {
    box-shadow: 0.5px 0.5px 1px hsl(237, 63%, 64%);
    opacity: 0.6;
  }

  input.checked + .slider:before {
    transform: translateX(26px);
  }
`;

const SwitchContainer = styled.section`
  color: whitesmoke;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  display: ${(props) => (props.active === true ? "none" : "unset")};
`;

function Toggle({ setSelectedMode, active }) {
  const [mode, setMode] = useState({
    bonus: false,
    className: "",
  });

  function updateMode() {
    !mode.bonus ? bonusTrue() : bonusFalse();
  }

  function bonusTrue() {
    setMode((mode) => ({
      ...mode,
      bonus: true,
      className: "checked",
    }));
  }

  function bonusFalse() {
    setMode((mode) => ({
      ...mode,
      bonus: false,
      className: "",
    }));
  }

  useEffect(() => {
    setSelectedMode(mode.bonus);
  }, [mode, setSelectedMode]);

  return (
    <SwitchContainer active={active}>
      <h1>Game Mode</h1>
      <div className="check-frame">
        <label htmlFor="gameMode" onClick={bonusTrue}>
          Classic
        </label>
        <Switch>
          <input
            type="checkbox"
            name="gameMode"
            id="gameMode"
            className={mode.className}
            onClick={updateMode}
            onKeyUp={(e) => {
              e.key === "Enter" && updateMode();
            }}
          />
          <span className="slider" onClick={updateMode}></span>
        </Switch>
        <label htmlFor="gameMode" onClick={bonusFalse}>
          Bonus
        </label>
      </div>
    </SwitchContainer>
  );
}

export default Toggle;
