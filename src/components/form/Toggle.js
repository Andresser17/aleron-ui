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
  const ballStyle = "before:al-bg-bg before:al-rounded-[50%] before:al-w-4 before:al-h-4";

  return (
    <div className={`al-flex ${disabled ? "al-opacity-70" : ""} ${palette}`}>
      <label className={`al-w-11 al-h-[1.4rem] ${styles["switch"]}`}>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <span
          className={`al-shadow-md al-rounded-2xl ${ballStyle} ${styles["slider"]}`}
        ></span>
      </label>
      <div className="al-ml-2 al-text-left">
        <span className="al-block">{label}</span>
        <span className="al-block al-text-[0.7rem] al-font-thin al-text-zinc-600">
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
