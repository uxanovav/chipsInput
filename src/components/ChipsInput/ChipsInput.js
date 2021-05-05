import React, { useEffect, useState } from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, onChange }) => {
  const [alertFlag, changeAlertFlag] = useState(false);
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    onUpdate(currentText);
    document.addEventListener("keydown", bckSpace, false);
  });

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
    if (currentChipsState) {
      let resultValue = currentChipsState
        .map((el) => {
          return el.value;
        })
        .join();
      return resultValue;
    }
  };

  const onDelete = (id) => {
    currentChipsState = currentChipsState.filter((chipsElement) => {
      return chipsElement.id !== id;
    });
    onChange(combineResult());
  };

  const bckSpace = (event) => {
    debugger;
    if (event.key === "Backspace" && currentText === "1") {
      currentChipsState.pop();
      onChange(combineResult());
    }
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
    console.log(currentText);
    if (newValue === ",") {
      setCurrentText("");
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
        setCurrentText("");
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
            value={currentText}
            onChange={(e) => {
              setCurrentText(e.target.value);
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
