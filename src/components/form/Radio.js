import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Radio.module.css";

function RadioInput({ option, checked, setChecked, name, disabled }) {
  // Styles
  const unselectedStyle = `bg-zinc-200 hover:bg-zinc-300`;
  const selectedStyle = `bg-bg hover:bg-hover focus:border-2 focus:border-focus focus:bg-bg ${styles["radio-button-checked"]}`;
  // Refs
  const inputRef = useRef();

  useEffect(() => {
    if (checked === option.value) {
      inputRef.current.checked = true;
    } else inputRef.current.checked = false;
  }, [checked, option]);

  return (
    <label
      className={`relative flex items-center my-2 ${
        option.disabled ? "opacity-70 pointer-events-none" : ""
      }`}
      htmlFor={name}
    >
      {/* Radio button */}
      <input
        ref={inputRef}
        className="invisible absolute top-0 left-0"
        value={option.value}
        type="radio"
        {...{ name, disabled }}
      />
      <i
        tabIndex="1"
        onClick={() => setChecked(option.value)}
        className={`relative shadow-md before:bg-text ${
          styles["radio-button"]
        } ${option.value === checked ? selectedStyle : unselectedStyle}`}
      ></i>
      {/* Label text */}
      <span className="ml-2">{option.label}</span>
    </label>
  );
}

function Radio({ palette = "primary", options = [], name = "", disabled }) {
  const [checked, setChecked] = useState("");
  const mapped = options.map((op) => {
    // select option by default
    if (checked.length === 0 && op.selected) setChecked(op.value);

    return (
      <RadioInput
        key={op.value}
        option={op}
        name={name}
        checked={checked}
        setChecked={setChecked}
        disabled={disabled}
      />
    );
  });

  return (
    <div
      className={`flex flex-col ${
        disabled ? "opacity-70 pointer-events-none" : ""
      } ${palette}`}
    >
      {mapped}
    </div>
  );
}
Radio.propTypes = {
  palette: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
