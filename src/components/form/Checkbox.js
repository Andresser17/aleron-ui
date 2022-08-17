import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

function Checkbox({
  palette = "primary-white",
  label = "",
  value,
  disabled,
  checked,
  readOnly,
  error,
  indeterminate,
  onChange,
}) {
  const [isChecked, setIsChecked] = useState(false);
  // Styles
  const checkboxStyle = `al-shadow-md al-rounded-sm al-w-5 al-h-5 focus:al-outline focus:al-outline-1 focus:al-outline-outline disabled:al-opacity-[var(--disabled-opacity)] ${styles["checkbox"]}`;
  // Unselected State
  const unselected =
    "hover:al-bg-black/20 active:al-bg-black/30 focus:al-bg-black/40 al-border-solid al-border al-border-border";
  // Selected State
  const selected =
    "checked:al-bg-bg checked:hover:al-bg-hover checked:active:al-bg-active checked:focus:al-bg-focus";
  // Indeterminate State
  const inputIndeter =
    "indeterminate:al-bg-bg indeterminate:hover:al-bg-hover indeterminate:active:al-bg-active indeterminate:focus:al-bg-focus";
  // Error state
  const inputError = "al-bg-red-300";
  const labelError = "al-text-red-300";
  // Checkmark icon
  const before = "before:al-bg-text";
  // Refs
  const checkboxRef = useRef();
  const labelRef = useRef();

  // Toggle indeterminate property
  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  // if checked is provided, change state
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e) => {
    if (readOnly) return;

    onChange(e), setIsChecked((prev) => !prev);
  };

  return (
    <div className={`al-flex al-justify-center al-items-center ${palette}`}>
      <input
        onChange={handleChange}
        ref={checkboxRef}
        className={`${checkboxStyle} ${before} ${
          error ? inputError : `${unselected} ${inputIndeter} ${selected}`
        }`}
        type="checkbox"
        checked={isChecked}
        {...{ disabled, value }}
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
  palette: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
