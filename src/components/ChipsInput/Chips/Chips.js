import React, { useState } from "react";
import styles from "../ChipsInput.module.css";

const Chips = ({
  value,
  id,
  onDelete,
  onChangeChipsValue,
  onAddToSelected,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  //Функция выбора "чипса" при зажатой ЛКМ

  const onSelectChips = (e) => {
    if (e.buttons === 1) {
      setIsSelected(!isSelected);
      onAddToSelected(id);
    }
  };

  return (
    <div className={isSelected ? styles.selected : styles.chips}>
      <span
        suppressContentEditableWarning
        contentEditable="true"
        onBlur={(e) => {
          onChangeChipsValue(id, e.target.innerHTML);
        }}
        onMouseOver={(e) => onSelectChips(e)}
      >
        {value}
      </span>{" "}
      <span onClick={() => onDelete(id)}>×</span>
    </div>
  );
};

export default Chips;
