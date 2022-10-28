import React from "react";
import useStyles from "hooks/useStyles";
// Components
import Container from "./Container";
import PropTypes from "prop-types";

function Circle({
  theme = "primary",
  disabled,
  loading,
  styles = {},
  onClick,
  children,
}) {
  const className = useStyles(
    {
      height: "h-9",
      hover: "hover:bg-primary/90",
      active: "active:bg-primary/80",
      focus:
        "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
      disabled: "disabled:bg-primary/50",
      rounded: "rounded-full",
      padding: "p-2",
      border: "border-none",
    },
    {
      main: `cursor-pointer bg-primary text-prim-text relative ${theme}`,
    },
    styles
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-full"}
      {...{ disabled, loading, className, onClick }}
    >
      {children}
    </Container>
  );
}
Circle.propTypes = {
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Circle;
