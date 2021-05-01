import React from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, onChange }) => {
  const inputPanel = React.createRef();

  let currentValue = "";

  let currentChipsState = value.split(",").map((chipsElement) => {
    return {
      id: Math.floor(Math.random() * 1000),
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

  const onDelete = (id) => {
    currentChipsState = currentChipsState.filter((chipsElement) => {
      return chipsElement.id !== id;
    });
    onChange(combineResult());
  };

  const onUpdate = (newValue) => {
    debugger;
    if (newValue === ",") {
      inputPanel.current.value = "";
      return null;
    }
    currentValue = newValue;
    if (currentValue.includes(",")) {
      if ((newValue.split('"').length - 1) % 2 !== 0) {
        alert("Закройте кавычки");
        inputPanel.current.value = inputPanel.current.value.slice(0, -1);
      } else {
        currentChipsState.push({
          id: currentChipsState.length,
          value: currentValue.slice(0, -1),
        });
        onChange(combineResult());
        inputPanel.current.value = "";
      }
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
              onDelete={onDelete}
            />
          );
        })}
        <label>
          <input
            ref={inputPanel}
            onChange={(e) => {
              onUpdate(e.target.value);
            }}
            placeholder="Введите ключевые слова"
          ></input>
          <span>{currentValue}</span>
        </label>
      </div>
    </>
  );
};

export default ChipsInput;
