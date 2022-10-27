import React, { useMemo } from "react";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import PropTypes from "prop-types";

function Circle({ theme, border, bold, disabled, loading, onClick, children }) {
  const className = useMemo(() => {
    const styles = {
      main: `flex items-center cursor-pointer bg-primary text-text ${theme}`,
      hover: "hover:bg-primary/90",
      active: "active:bg-primary/80",
      focus:
        "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
      bold: bold ? "font-semibold" : "font-normal",
      rounded: "rounded-full",
      padding: "p-2",
      disabled: "disabled:bg-primary/50",
      border: border ? "border-solid border border-border" : "border-none",
    };

    return Object.keys(styles)
      .map((key) => styles[key])
      .join(" ");
  }, [theme, border]);

  return (
    <button {...{ onClick, disabled, className }}>
      {loading ? <LoadingIcon className="text-lg block w-5 h-5 animate-spin" /> : children}
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
