import React from "react";
import PropTypes from "prop-types";
import styles from "./Toggle.module.css";

function Toggle({
  palette = "primary",
  name,
  value,
  label,
  subtitle,
  checked,
  disabled = false,
  onChange,
}) {
  const ballStyle = "before:bg-bg before:rounded-[50%] before:w-4 before:h-4";

  return (
    <div className={`flex ${palette} ${disabled ? "opacity-70" : ""}`}>
      <label className={`w-11 h-[1.4rem] ${styles["switch"]}`}>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <span
          className={`shadow-md rounded-2xl ${ballStyle} ${palette} ${styles["slider"]}`}
        ></span>
      </label>
      <div className="ml-2 text-left">
        <span className="block">{label}</span>
        <span className="block text-[0.7rem] font-thin text-zinc-600">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
Toggle.propTypes = {
  palette: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  subtitle: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
