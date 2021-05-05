import React, { useEffect, useState } from "react";
import Chips from "./Chips/Chips";
import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, onChange }) => {
  const [alertFlag, changeAlertFlag] = useState(false);
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    onUpdate(currentText);
  });
  const regexp = /,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/;

  //Нарезаем строку в массив объектов для "чипсов"

  let currentChipsState = value
    ? value.split(regexp).map((chipsElement) => {
        return {
          id: Math.floor(Math.random() * 10000),
          value: chipsElement,
        };
      })
    : [];

  // Инициализируем массив выбранных "чипсов"

  let selectedChips = [];

  //Склеиваем массив объектов в строку для передачи родительскому компоненту

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

  // Функция удаления по щелчку на "Х"

  const onDelete = (id) => {
    currentChipsState = currentChipsState.filter((chipsElement) => {
      return chipsElement.id !== id;
    });
    onChange(combineResult());
  };

  // Функция удаления по нажатию на клавиши "BackSpace/Delete"

  const onDeleteKeyDown = (event) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      currentText === ""
    ) {
      if (selectedChips.length !== 0) {
        for (let i = 0; i < selectedChips.length; i++) {
          currentChipsState = currentChipsState.filter((chipsElement) => {
            return chipsElement.id !== selectedChips[i];
          });
          onChange(combineResult());
        }
        selectedChips = [];
      } else {
        currentChipsState.pop();
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
    currentChipsState = currentChipsState.map((chipsElement) => {
      return chipsElement.id === id
        ? { ...chipsElement, value: value }
        : chipsElement;
    });
    onChange(combineResult());
  };

  //Функция считывания событий в "input" элементе

  const onUpdate = (newValue) => {
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
        currentChipsState.push({
          id: Math.floor(Math.random() * 1000),
          value: currentText.slice(0, currentText.length - 1),
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
