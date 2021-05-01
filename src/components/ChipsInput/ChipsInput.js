import React from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, onChange }) => {
  const inputPanel = React.createRef();

  let currentValue = "";

  const currentChipsState = value.split(",").map((chipsElement, idx) => {
    return {
      id: idx,
      value: chipsElement,
    };
  });

  const combineResult = () => {
    let resultValue = currentChipsState
      .map((el) => {
        return el.value;
      })
      .join();
    return resultValue;
  };

  const onUpdate = (newValue) => {
    debugger;
    currentValue = newValue;
    if (currentValue.includes(",")) {
      currentChipsState.push({
        id: currentChipsState.length,
        value: currentValue.slice(0, -1),
      });
      onChange(combineResult());
      inputPanel.current.value = "";
    }
  };

  return (
    <>
      <div>
        <span>Current Root Value: </span>
        {value}
      </div>
      <div className={styles.chips_input}>
        {currentChipsState.map((chipsElement) => {
          return (
            <Chips
              value={chipsElement.value}
              id={chipsElement.id}
              key={chipsElement.id}
            />
          );
        })}
        <label>
          <input
            ref={inputPanel}
            onChange={(e) => {
              onUpdate(e.target.value);
            }}
          ></input>
          <span>{currentValue}</span>
        </label>
      </div>
    </>
  );
};

export default ChipsInput;
