import React, { useState, useEffect, useRef } from "react";
import useStyles from "@/hooks/useStyles";
import moduleStyles from "./Checkbox.module.css";

interface Props {
  theme: string;
  styles: string;
  label: string;
  value: string;
  name: string;
  checked: boolean;
  readOnly: boolean;
  disabled: boolean;
  error: boolean;
  setError: () => void;
  indeterminate: boolean;
  onChange: () => void;
}

export default function Checkbox({
  theme = "primary",
  styles = {},
  label = "",
  value,
  disabled,
  checked,
  readOnly,
  error,
  setError = () => undefined,
  indeterminate,
  onChange = () => undefined,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const className = useStyles(
    {
      container: {
        main: "flex justify-center items-center w-fit",
      },
      checkbox: {
        dimen: "w-5 h-5",
        unselected:
          "hover:bg-black/20 active:bg-black/30 focus:bg-black/40 border-solid border border-border",
        selected: error
          ? "checked:bg-red-400"
          : "checked:bg-primary checked:hover:bg-primary/90 checked:active:bg-primary/80 checked:focus:bg-primary/70",
        indeterminate:
          "indeterminate:bg-primary indeterminate:hover:bg-primary/90 indeterminate:active:bg-primary/80 indeterminate:focus:bg-primary/70",
        checkmarkIcon: "before:bg-prim-text",
        main: `shadow-md rounded-sm focus:outline focus:outline-1 focus:outline-outline disabled:bg-bg/30 ${moduleStyles["checkbox"]}`,
      },
      description: {
        disabled: disabled ? "text-text/50" : "",
        error: error ? "text-red-400" : "text-text dark:dark",
        main: "ml-2",
      },
    },
    styles,
    {
      disabled,
      error,
      moduleStyles,
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
    <div className={`${className.container} ${theme}`}>
      <input
        onChange={handleChange}
        ref={checkboxRef}
        className={className.checkbox}
        type="checkbox"
        checked={isChecked}
        {...{ disabled, value }}
      />
      <label ref={labelRef} className={className.description}>
        {label}
      </label>
    </div>
  );
}
