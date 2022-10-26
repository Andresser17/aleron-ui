import React, { useMemo } from "react";
// Components
import Icon from "./Icon";
import Circle from "./Circle";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import PropTypes from "prop-types";

function Button({
  palette,
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
      main:
        "flex items-center cursor-pointer bg-bg text-text hover:bg-hover active:bg-active" +
        ` ${palette}`,
      bold: bold ? "font-semibold" : "font-normal",
      rounded: rounded ? "rounded-md" : "rounded-sm",
      padding: !text ? "p-2" : "px-5 py-[0.3rem]",
      disabled: "disabled:bg-bg/50",
      focus:
        "focus:outline focus:outline-1 focus:bg-focus focus:outline-outline",
      border: border ? "border-solid border border-border" : "border-none",
    };

    return Object.keys(styles)
      .map((key) => styles[key])
      .join(" ");
  }, [palette, bold, rounded, text, border]);

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
