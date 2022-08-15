import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

function Checkbox({
  palette = "primary",
  value,
  label,
  disabled,
  error,
  indeterminate,
  onClick,
}) {
  const checkboxStyle = `al-shadow-md al-rounded-sm al-w-5 al-h-5 disabled:al-opacity-[var(--disabled-opacity)] ${styles["checkbox"]}`;
  // Unselected State
  const unselected =
    "al-bg-gray-100 hover:al-bg-gray-200 active:al-bg-gray-300 focus:al-bg-gray-100 focus:al-border focus:al-border-gray-400";
  // Selected State
  const selected =
    "checked:al-bg-bg checked:hover:al-bg-hover checked:active:al-bg-active checked:focus:al-bg-focus checked:focus:al-border-focus-border";
  // Indeterminate State
  const inputIndeter =
    "indeterminate:al-bg-bg indeterminate:hover:al-bg-hover indeterminate:active:al-bg-active indeterminate:focus:al-bg-focus indeterminate:focus:al-border-focus-border";
  // Error state
  const inputError = "al-bg-red-300";
  const labelError = "al-text-red-300";
  // Checkmark icon
  const before = "before:al-bg-text";
  const checkboxRef = useRef();
  const labelRef = useRef();

  // Toggle indeterminate property
  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  // Assign id from label prop
  useEffect(() => {
    const newId = label.replaceAll(" ", "-");
    labelRef.current.htmlFor = newId;
    checkboxRef.current.id = newId;
  }, [label]);

  return (
    <div
      id={`cont-${label}`}
      className={`al-flex al-justify-center al-items-center ${palette}`}
    >
      <input
        onClick={onClick}
        ref={checkboxRef}
        className={`${checkboxStyle} ${before} ${
          error ? inputError : `${unselected} ${inputIndeter} ${selected}`
        }`}
        value={value}
        type="checkbox"
        disabled={disabled}
      />
      <label
        ref={labelRef}
        className={`al-ml-2 ${
          disabled ? "al-opacity-[var(--disabled-opacity)]" : ""
        } ${error ? labelError : "al-text-text"}`}
      >
        {label}
      </label>
    </div>
  );
}
Checkbox.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

export default Checkbox;
