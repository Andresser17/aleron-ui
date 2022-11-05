import React from "react";
import useStyles from "hooks/useStyles";
// Components
import Container from "./Container";
import PropTypes from "prop-types";

function Circle({
  theme = "primary",
  styles = {},
  disabled,
  loading,
  onClick,
  children,
}) {
  const className = useStyles(
    {
      button: {
        dimen: "w-10 h-10",
        hover: "hover:bg-primary/90",
        active: "active:bg-primary/80",
        focus:
          "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
        disabled: "disabled:bg-primary/50",
        rounded: "rounded-full",
        border: "border-none",
        main: "flex justify-center items-center cursor-pointer bg-primary text-prim-text relative",
      },
    },
    styles
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-full"}
      {...{ theme, disabled, loading, className: className.button, onClick }}
    >
      {children}
    </Container>
  );
}
Circle.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Circle;
