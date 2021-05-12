import React, { useEffect, useState } from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, onChange }) => {
  //Нарезаем строку в массив объектов для "чипсов"

  const regexp = new RegExp(',(?=(?:[^"]*"[^"]*")*(?![^"]*"))');
  let arrayOfIncomingValue = value
    ? value.split(regexp).map((chipsElement, idx) => {
        return {
          id: idx,
          value: chipsElement,
        };
      })
    : [];
  const [alertFlag, changeAlertFlag] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentChipsState, setCurrentChipsState] =
    useState(arrayOfIncomingValue);

  //Функция считывания событий в "input" элементе

  const onUpdate = (newValue) => {
    console.log(currentChipsState);
    if (newValue === ",") {
      setCurrentText("");
      return null;
    }
    setCurrentText(newValue);
    if (currentText[currentText.length - 1] === '"' && alertFlag === true) {
      changeAlertFlag(false);
    }
    if (currentText[currentText.length - 1] === ",") {
      if ((currentText.split('"').length - 1) % 2 !== 0) {
        changeAlertFlag(true);
      } else {
        setCurrentChipsState([
          ...currentChipsState,
          {
            id: currentChipsState.length + 1,
            value: currentText.slice(0, currentText.length - 1),
          },
        ]);
        setCurrentText("");
        changeAlertFlag(false);
      }
    }
  };

  useEffect(() => {
    onUpdate(currentText);
  }, [currentText]);

  useEffect(() => {
    onChange(combineResult(currentChipsState));
  }, [currentChipsState]);

  // Инициализируем массив выбранных "чипсов"

  let selectedChips = [];

  //Склеиваем массив объектов в строку для передачи родительскому компоненту

  const combineResult = (currentChipsState) => {
    if (currentChipsState) {
      let resultValue = currentChipsState
        .map((el) => {
          return el.value;
        })
        .join();
      return resultValue;
    }
  };

  // Функция удаления по щелчку на "Х"

  const onDelete = (id) => {
    setCurrentChipsState(
      currentChipsState.filter((chipsElement) => {
        return chipsElement.id !== id;
      })
    );
    onChange(combineResult());
  };

  // Функция удаления по нажатию на клавиши "BackSpace/Delete"

  const onDeleteKeyDown = (event) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      currentText === ""
    ) {
      if (selectedChips.length !== 0) {
        setCurrentChipsState(
          currentChipsState.filter((chipsElement) => {
            return !selectedChips.includes(chipsElement.id);
          })
        );
        onChange(combineResult());
        selectedChips = [];
      } else {
        setCurrentChipsState(
          currentChipsState.slice(0, currentChipsState.length - 1)
        );
        onChange(combineResult());
      }
    }
  };

  //Функция добавления в массив выбранных "чипсов"

  const onAddToSelected = (id) => {
    return !selectedChips.includes(id) ? selectedChips.push(id) : null;
  };

  //Функция редактирования "чипса" при нажатии на элемент

  const onChangeChipsValue = (id, value) => {
    setCurrentChipsState(
      currentChipsState.map((chipsElement) => {
        return chipsElement.id === id
          ? { ...chipsElement, value: value }
          : chipsElement;
      })
    );
    onChange(combineResult());
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
                  key={chipsElement.id}
                  onChangeChipsValue={onChangeChipsValue}
                  onDelete={onDelete}
                  onAddToSelected={onAddToSelected}
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
            onKeyDown={(e) => {
              onDeleteKeyDown(e);
            }}
            onBlur={(e) => {
              setCurrentText(e.target.value + ",");
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
