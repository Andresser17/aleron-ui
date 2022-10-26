import React, { useMemo } from "react";
// Components
import Icon from "./Icon";
import Circle from "./Circle";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import PropTypes from "prop-types";

function Button({
  theme,
  text,
  border,
  bold,
  rounded,
  disabled,
  loading,
  onClick,
}) {
  const className = useMemo(() => {
    const styles = {
      main: `flex items-center cursor-pointer bg-primary text-text ${theme}`,
      hover: "hover:bg-primary/90",
      active: "active:bg-primary/80",
      focus:
        "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
      bold: bold ? "font-semibold" : "font-normal",
      rounded: rounded ? "rounded-md" : "rounded-sm",
      padding: !text ? "p-2" : "px-5 py-[0.3rem]",
      disabled: "disabled:bg-primary/50",
      border: border ? "border-solid border border-border" : "border-none",
    };

    return Object.keys(styles)
      .map((key) => styles[key])
      .join(" ");
  }, [theme, bold, rounded, text, border]);

  return (
    <button {...{ onClick, disabled, className }}>
      {loading ? (
        <LoadingIcon className="text-lg block w-5 h-5" />
      ) : (
        text && <span className="text-lg block">{text}</span>
      )}
    </button>
  );
}
Button.propTypes = {
  palette: PropTypes.string,
  text: PropTypes.string,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  bold: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.Icon = Icon;
Button.Circle = Circle;

export default Button;
