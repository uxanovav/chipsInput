import React from "react";
import Chips from "./Chips/Chips";

const ChipsInput = ({ value, onChange }) => {
  const currentChipsState = value.split(",").map((chipsElement, idx) => {
    return {
      id: idx,
      value: chipsElement,
    };
  });

  return (
    <label>
      <span>{value}</span>
      <span>
        {currentChipsState.map((chipsElement) => {
          return (
            <Chips
              value={chipsElement.value}
              id={chipsElement.id}
              key={chipsElement.id}
            />
          );
        })}
      </span>
      <input></input>
    </label>
  );
};

export default ChipsInput;
