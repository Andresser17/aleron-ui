import React, { useState, useEffect, useRef } from "react";
import useStyles from "@/hooks/useStyles";
import moduleStyles from "./Radio.module.css";

function RadioInput({ styles, option, checked, setChecked, name, disabled }) {
  const className = useStyles(
    {
      radio: {
        unselected:
          option.value !== checked
            ? "bg-black/0 outline outline-1 outline-border hover:bg-black/20 dark:dark"
            : "",
        selected:
          option.value === checked
            ? `bg-primary hover:bg-primary/90 focus:outline focus:outline-2 focus:al-outline-primary/80 focus:bg-primary/70 ${moduleStyles["radio-button-checked"]}`
            : "",

        main: `relative shadow-md before:bg-prim-text ${moduleStyles["radio-button"]}`,
      },
      label: {
        disabled: option.disabled ? "opacity-70 pointer-events-none" : "",
        main: "relative text-text flex items-center my-2",
      },
      labelText: {
        main: "ml-2 text-text dark:dark",
      },
    },
    styles,
    { option, moduleStyles }
  );
  // Refs
  const inputRef = useRef();

  useEffect(() => {
    if (checked === option.value) {
      inputRef.current.checked = true;
    } else inputRef.current.checked = false;
  }, [checked, option]);

  return (
    <label className={className.label} htmlFor={name}>
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
        className={className.radio}
      ></i>
      {/* Label text */}
      <span className={className.labelText}>{option.label}</span>
    </label>
  );
}

interface Props {
  theme: string;
  styles: any;
  options: Array<{ label: string; value: string | number | boolean }>;
  name: string;
  disabled: boolean;
}

function Radio({
  theme = "primary",
  styles = {},
  options = [],
  name = "",
  disabled,
}: Props) {
  const [checked, setChecked] = useState("");
  const className = useStyles(
    {
      container: {
        main: "flex flex-col",
        disabled: disabled ? "opacity-70 pointer-events-none" : "",
      },
    },
    styles,
    { disabled }
  );
  const mapped = options.map((op) => {
    // select option by default
    if (checked.length === 0 && op.selected) setChecked(op.value);

    return (
      <RadioInput
        styles={styles}
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
    <div tabIndex="1" className={`${className.container} ${theme}`}>
      {mapped}
    </div>
  );
}

export default Radio;
