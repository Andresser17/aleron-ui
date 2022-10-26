import React, { useMemo } from "react";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import PropTypes from "prop-types";

function Circle({
  palette,
  border,
  bold,
  disabled,
  loading,
  onClick,
  children,
}) {
  const className = useMemo(() => {
    const styles = {
      main:
        "flex items-center cursor-pointer bg-bg text-text font-semibold hover:bg-hover active:bg-active" +
        ` ${palette}`,
      rounded: "rounded-full",
      padding: "p-2",
      disabled: "disabled:bg-bg/50",
      focus:
        "focus:outline focus:outline-1 focus:bg-focus focus:outline-outline",
      border: border ? "border-solid border border-border" : "border-none",
    };

    return Object.keys(styles)
      .map((key) => styles[key])
      .join(" ");
  }, [palette, border]);

  return (
    <button {...{ onClick, disabled, className }}>
      {loading ? <LoadingIcon className="text-lg block w-5 h-5" /> : children}
    </button>
  );
}
Circle.propTypes = {
  palette: PropTypes.string,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Circle;
