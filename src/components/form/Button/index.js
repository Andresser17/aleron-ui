import React, { useMemo } from "react";
import useStyles from "hooks/useStyles";
// Components
import Container from "./Container";
import Icon from "./Icon";
import Circle from "./Circle";
import PropTypes from "prop-types";

function Button({
  theme = "primary",
  text,
  disabled,
  loading,
  styles,
  onClick,
}) {
  const className = useStyles(
    {
      height: "h-9",
      hover: "hover:bg-primary/90",
      active: "active:bg-primary/80",
      focus:
        "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
      disabled: "disabled:bg-primary/50 disabled:cursor-auto",
      rounded: "rounded-sm",
      padding: !text ? "p-2" : "px-5 py-[0.3rem]",
      border: "border-none",
    },
    {
      main: `cursor-pointer bg-primary text-prim-text relative ${theme}`,
    },
    styles
  );

  return (
    <Container {...{ disabled, loading, className, onClick }}>
      <span className="text-lg block">{text}</span>
    </Container>
  );
}
Button.propTypes = {
  theme: PropTypes.string,
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.Icon = Icon;
Button.Circle = Circle;

export default Button;
