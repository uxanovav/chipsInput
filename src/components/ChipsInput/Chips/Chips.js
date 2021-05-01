import React from "react";
import styles from "../ChipsInput.module.css";

const Chips = ({ value, id, onDelete }) => {
  return (
    <div className={styles.chips}>
      {value} <span onClick={() => onDelete(id)}>X</span>
    </div>
  );
};

export default Chips;
