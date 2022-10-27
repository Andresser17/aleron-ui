import React from "react";
import useStyles from "hooks/useStyles";
// Components
import Container from "./Container";
import PropTypes from "prop-types";

function Icon({
  theme = "primary",
  text,
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
      disabled: "disabled:bg-primary/50 cursor-auto",
      rounded: "rounded-sm",
      padding: !text ? "p-2" : "px-5 py-[0.3rem]",
      border: "border-none",
    },
    {
      main: `flex items-center cursor-pointer bg-primary text-text relative ${theme}`,
    },
    styles
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-sm"}
      {...{ disabled, loading, className, onClick }}
    >
      {children}
      {text && <span className="text-lg block ml-2">{text}</span>}
    </Container>
  );
}
Icon.propTypes = {
  theme: PropTypes.string,
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Icon;
