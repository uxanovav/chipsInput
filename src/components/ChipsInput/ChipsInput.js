import React, { useState } from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";
// import { CSSTransition } from "react-transition-group";

const ChipsInput = ({ value, onChange }) => {
  const inputPanel = React.createRef();

  const [alertFlag, changeAlertFlag] = useState(false);

  let currentValue = "";
  let currentChipsState = value
    ? value.split(",").map((chipsElement) => {
        return {
          id: Math.floor(Math.random() * 1000),
          value: chipsElement,
        };
      })
    : [];

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
  const onChangeChipsValue = (id, value) => {
    currentChipsState = currentChipsState.map((chipsElement) => {
      return chipsElement.id === id
        ? { ...chipsElement, value: value }
        : chipsElement;
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
    if (currentValue[currentValue.length - 1] === '"' && alertFlag === true) {
      changeAlertFlag(false);
    }
    if (currentValue[currentValue.length - 1] === ",") {
      if ((newValue.split('"').length - 1) % 2 !== 0) {
        changeAlertFlag(true);
      } else {
        currentChipsState.push({
          id: currentChipsState.length,
          value: currentValue.slice(0, -1),
        });
        debugger;
        onChange(combineResult());
        inputPanel.current.value = "";
        changeAlertFlag(false);
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
        {value
          ? currentChipsState.map((chipsElement) => {
              return (
                <Chips
                  value={chipsElement.value}
                  id={chipsElement.id}
                  changeFlag={chipsElement.changeFlag}
                  key={chipsElement.id}
                  onChangeChipsValue={onChangeChipsValue}
                  onDelete={onDelete}
                />
              );
            })
          : null}
        <label>
          <input
            ref={inputPanel}
            onChange={(e) => {
              onUpdate(e.target.value);
            }}
            placeholder={value ? "" : "Введите ключевые слова"}
          ></input>
          <span>{currentValue}</span>
        </label>
      </div>
      {alertFlag ? (
        <span className={styles.alert}>Закройте кавычки с двух сторон</span>
      ) : null}
    </>
  );
};

export default ChipsInput;
