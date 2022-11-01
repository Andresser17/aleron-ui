import React from "react";
import useStyles from "hooks/useStyles";
// Components
import Container from "./Container";
import Icon from "./Icon";
import Circle from "./Circle";
import PropTypes from "prop-types";

function Button({
  theme = "primary",
  styles = {},
  text,
  disabled,
  loading,
  onClick,
}) {
  const className = useStyles(
    {
      hover: "hover:bg-primary/90",
      active: "active:bg-primary/80",
      focus:
        "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
      disabled: "disabled:bg-primary/50 disabled:cursor-auto",
      rounded: "rounded-sm",
      padding: "px-5 py-[0.3rem]",
      font: "text-lg font-semibold",
      border: "border-none",
    },
    {
      main: `cursor-pointer bg-primary text-prim-text relative ${theme}`,
    },
    styles
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-sm"}
      {...{ disabled, loading, className, onClick }}
    >
      {text}
    </Container>
  );
}
Button.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Button.Icon = Icon;
Button.Circle = Circle;

export default Button;
