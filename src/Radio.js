import PropTypes from "prop-types";
import styles from "./Radio.module.css";

function Radio({
  palette = "primary",
  value,
  name = "",
  label = "",
  disabled,
  onClick,
}) {
  return (
    <label className={`flex items-center my-2 ${palette}`} htmlFor={name}>
      {/* Radio button */}
      <div className="relative w-[1.5rem] h-[1.5rem]">
        <input
          onClick={onClick}
          className={`opacity-0 absolute top-0 left-0 w-full h-full ${styles["radio-input"]}`}
          value={value}
          type="radio"
          {...{ name, disabled }}
        />
        <i
          className={`shadow-md bg-bg before:bg-text ${styles["radio-button"]}`}
        ></i>
      </div>
      {/* Label text */}
      <span className="ml-2">{label}</span>
    </label>
  );
}
Radio.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Radio;
