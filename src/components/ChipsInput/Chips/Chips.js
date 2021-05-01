import React from "react";
import styles from "../ChipsInput.module.css";

const Chips = ({ value }) => {
  return <div className={styles.chips}>{value} X</div>;
};

export default Chips;
