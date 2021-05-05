import React from "react";
import styles from "../ChipsInput.module.css";

const Chips = ({ value, id, onDelete, onChangeChipsValue }) => {
  return (
    <div className={styles.chips}>
      <span
        suppressContentEditableWarning
        contentEditable="true"
        onBlur={(e) => onChangeChipsValue(id, e.target.innerHTML)}
      >
        {value}
      </span>{" "}
      <span onClick={() => onDelete(id)}>×</span>
    </div>
  );
};

export default Chips;
