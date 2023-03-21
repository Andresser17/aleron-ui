import React, { useState, useEffect } from "react";
// Hooks
import useStyles from "@/hooks/useStyles";
// Styles
import moduleStyles from "./Toggle.module.css";

interface Props {
  theme: string;
  styles: any;
  name: string;
  value: string;
  label: string;
  subtitle: string;
  checked: boolean;
  readOnly: boolean;
  disabled: boolean;
  onChange: (e: any) => void;
}

function Toggle({
  theme = "primary",
  styles = {},
  name,
  value,
  label,
  subtitle,
  checked,
  readOnly,
  disabled = false,
  onChange,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const className = useStyles(
    {
      container: {
        dimen: "w-fit",
        disabled: disabled ? "opacity-70" : "",
        main: "flex",
      },
      toggleContainer: {
        dimen: "w-11 h-[1.4rem]",
        main: `${moduleStyles["switch"]}`,
      },
      toggle: {
        checked: isChecked ? "bg-primary" : "bg-transparent",
        outline: "outline outline-1 outline-primary/70",
        rounded: "rounded-2xl",
        main: `shadow-md ${moduleStyles["slider"]}`,
      },
      label: {
        margin: "ml-2",
        main: "text-left",
      },
      labelText: {
        main: "text-text dark:dark",
      },
      subtitle: {
        main: "text-[0.7rem] font-thin text-text/70 dark:dark",
      },
    },
    styles,
    { disabled, isChecked, moduleStyles }
  );
  const ballStyle = `${
    isChecked ? "before:bg-prim-text" : "before:bg-primary"
  } before:rounded-[50%] before:w-4 before:h-4`;

  // if checked is provided, change state
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e) => {
    if (readOnly) return;

    onChange(e), setIsChecked((prev) => !prev);
  };

  return (
    <div className={`${className.container} ${theme}`}>
      <div className={className.toggleContainer}>
        <input
          onChange={handleChange}
          type="checkbox"
          {...{ disabled, value, name, checked: isChecked }}
        />
        <span
          onClick={handleChange}
          className={`${className.toggle} ${ballStyle}`}
        ></span>
      </div>
      <label htmlFor={name} className={className.label}>
        <p className={className.labelText}>{label}</p>
        <p className={className.subtitle}>{subtitle}</p>
      </label>
    </div>
  );
}

export default Toggle;
