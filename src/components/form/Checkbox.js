import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import PropTypes from "prop-types";
import moduleStyles from "./Checkbox.module.css";

function Checkbox({
  theme = "primary",
  label = "",
  styles = {},
  value,
  disabled,
  checked,
  readOnly,
  error,
  setError = () => undefined,
  indeterminate,
  onChange = () => undefined,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const containerClassName = useStyles(
    { main: "flex justify-center items-center w-fit" },
    {},
    styles
  );
  const checkboxClassName = useStyles(
    {
      unselected:
        "hover:bg-black/20 active:bg-black/30 focus:bg-black/40 border-solid border border-border",
    },
    {
      main: `shadow-md rounded-sm w-5 h-5 focus:outline focus:outline-1 focus:outline-outline disabled:bg-bg/30 ${moduleStyles["checkbox"]}`,
      selected: error
        ? "checked:bg-red-400"
        : "checked:bg-primary checked:hover:bg-primary/90 checked:active:bg-primary/80 checked:focus:bg-primary/70",
      indeterminate:
        "indeterminate:bg-primary indeterminate:hover:bg-primary/90 indeterminate:active:bg-primary/80 indeterminate:focus:bg-primary/70",
      checkmarkIcon: "before:bg-prim-text",
    }
  );
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
    if (error) setError(false);

    onChange(e), setIsChecked((prev) => !prev);
  };

  return (
    <div className={`${containerClassName} ${theme}`}>
      <input
        onChange={handleChange}
        ref={checkboxRef}
        className={checkboxClassName}
        type="checkbox"
        checked={isChecked}
        {...{ disabled, value }}
      />
      <label
        ref={labelRef}
        className={`ml-2 ${disabled ? "text-text/50" : ""} ${
          error ? "text-red-400" : "text-text dark:dark"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
Checkbox.propTypes = {
  theme: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  setError: PropTypes.func,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
