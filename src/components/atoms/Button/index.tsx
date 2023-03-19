import React from "react";
import useStyles from "@/hooks/useStyles";
// Components
import Container from "./Container";
import Icon from "./Icon";
import Circle from "./Circle";

interface Props {
  theme: string;
  styles: any;
  text: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.Node;
}

function Button({
  theme = "primary",
  styles = {},
  text,
  disabled,
  loading,
  onClick,
}: Props) {
  const className = useStyles(
    {
      button: {
        hover: "hover:bg-primary/90",
        active: "active:bg-primary/80",
        focus:
          "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
        disabled: "disabled:bg-primary/50 disabled:cursor-auto",
        rounded: "rounded-sm",
        padding: "px-5 py-[0.3rem]",
        font: "text-lg font-semibold",
        border: "border-none",
        main: "cursor-pointer bg-primary text-prim-text relative",
      },
    },
    styles
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-sm"}
      {...{ theme, disabled, loading, className: className.button, onClick }}
    >
      {text}
    </Container>
  );
}

Button.Icon = Icon;
Button.Circle = Circle;

export default Button;
