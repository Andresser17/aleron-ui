import React, { useState, useEffect } from "react";
import useStyles from "hooks/useStyles";
import PropTypes from "prop-types";
import toggleStyles from "./Toggle.module.css";

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
}) {
  const [isChecked, setIsChecked] = useState(false);
  const containerClassName = useStyles(
    { main: "flex w-fit" },
    { disabled: disabled ? "opacity-70" : "" },
    styles
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
    <div className={`${containerClassName} ${theme}`}>
      <label className={`w-11 h-[1.4rem] ${toggleStyles["switch"]}`}>
        <input
          type="checkbox"
          onChange={handleChange}
          {...{ disabled, value, name, checked: isChecked }}
        />
        <span
          className={`shadow-md rounded-2xl outline outline-1 outline-primary/70 ${ballStyle} ${
            isChecked ? "bg-primary" : "bg-card"
          } ${toggleStyles["slider"]}`}
        ></span>
      </label>
      <div className="ml-2 text-left">
        <span className="block text-text dark:dark">{label}</span>
        <span className="block text-[0.7rem] font-thin text-text/70 dark:dark">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
Toggle.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  subtitle: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
