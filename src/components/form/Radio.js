import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import PropTypes from "prop-types";
import radioStyles from "./Radio.module.css";

function RadioInput({ option, checked, setChecked, name, disabled }) {
  const radioClassName = useStyles(
    {},
    {
      main: `relative shadow-md before:bg-prim-text ${radioStyles["radio-button"]}`,
      unselected:
        option.value !== checked
      ? "bg-black/0 outline outline-1 outline-border hover:bg-black/20 dark:dark"
          : "",
      selected:
        option.value === checked
          ? `bg-primary hover:bg-primary/90 focus:outline focus:outline-2 focus:al-outline-primary/80 focus:bg-primary/70 ${radioStyles["radio-button-checked"]}`
          : "",
    },
    {}
  );
  // Refs
  const inputRef = useRef();

  useEffect(() => {
    if (checked === option.value) {
      inputRef.current.checked = true;
    } else inputRef.current.checked = false;
  }, [checked, option]);

  return (
    <label
      className={`relative text-text flex items-center my-2 ${
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
        className={radioClassName}
      ></i>
      {/* Label text */}
      <span className="ml-2 text-text dark:dark">{option.label}</span>
    </label>
  );
}

function Radio({
  theme = "primary",
  styles = {},
  options = [],
  name = "",
  disabled,
}) {
  const [checked, setChecked] = useState("");
  const containerClassName = useStyles(
    {
      main: "flex flex-col",
    },
    {
      disabled: disabled ? "opacity-70 pointer-events-none" : "",
    },
    styles
  );
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
    <div tabIndex="1" className={`${containerClassName} ${theme}`}>
      {mapped}
    </div>
  );
}
Radio.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
