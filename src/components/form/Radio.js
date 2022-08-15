import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Radio.module.css";

function RadioInput({ option, checked, setChecked, name, disabled }) {
  // Styles
  const unselectedStyle = `al-bg-zinc-200 hover:al-bg-zinc-300`;
  const selectedStyle = `al-bg-bg hover:al-bg-hover focus:al-border-2 focus:al-border-focus focus:al-bg-bg ${styles["radio-button-checked"]}`;
  // Refs
  const inputRef = useRef();

  useEffect(() => {
    if (checked === option.value) {
      inputRef.current.checked = true;
    } else inputRef.current.checked = false;
  }, [checked, option]);

  return (
    <label
      className={`al-relative al-flex al-items-center al-my-2 ${
        option.disabled ? "al-opacity-70 al-pointer-events-none" : ""
      }`}
      htmlFor={name}
    >
      {/* Radio button */}
      <input
        ref={inputRef}
        className="al-invisible al-absolute al-top-0 al-left-0"
        value={option.value}
        type="radio"
        {...{ name, disabled }}
      />
      <i
        tabIndex="1"
        onClick={() => setChecked(option.value)}
        className={`al-relative al-shadow-md before:al-bg-text ${
          styles["radio-button"]
        } ${option.value === checked ? selectedStyle : unselectedStyle}`}
      ></i>
      {/* Label text */}
      <span className="al-ml-2">{option.label}</span>
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
      className={`al-flex al-flex-col ${
        disabled ? "al-opacity-70 al-pointer-events-none" : ""
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
