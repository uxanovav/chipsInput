import React, { useState } from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";
// import { CSSTransition } from "react-transition-group";

const ChipsInput = ({ value, onChange }) => {
  const [alertFlag, changeAlertFlag] = useState(false);
  const inputPanel = React.createRef();
  const regexp = /,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/;
  let currentChipsState = value
    ? value.split(regexp).map((chipsElement) => {
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
    if (newValue === ",") {
      inputPanel.current.value = "";
      return null;
    }
    if (newValue[newValue.length - 1] === '"' && alertFlag === true) {
      changeAlertFlag(false);
    }
    if (newValue[newValue.length - 1] === ",") {
      if ((newValue.split('"').length - 1) % 2 !== 0) {
        changeAlertFlag(true);
      } else {
        currentChipsState.push({
          id: Math.floor(Math.random() * 1000),
          value: newValue.slice(0, newValue.length - 1),
        });
        onChange(combineResult());
        inputPanel.current.value = "";
        changeAlertFlag(false);
      }
    }
  };

  return (
    <>
      <div className={styles.chips_input}>
        {value
          ? currentChipsState.map((chipsElement) => {
              if (chipsElement.value === "") {
                return null;
              }
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
            onBlur={(e) => {
              onUpdate(e.target.value + ",");
            }}
            placeholder={value ? "" : "Введите ключевые слова"}
          ></input>
        </label>
      </div>
      <span className={styles.alert}>
        {alertFlag && "Закройте кавычки с двух сторон"}
      </span>
    </>
  );
};

export default ChipsInput;
