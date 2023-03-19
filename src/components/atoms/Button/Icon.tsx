import React from "react";
import useStyles from "@/hooks/useStyles";
// Components
import Container from "./Container";

interface Props {
  theme: string;
  styles: any;
  text: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.Node;
}

function Icon({
  theme = "primary",
  styles = {},
  text,
  disabled,
  loading,
  onClick,
  children,
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
        padding: !text ? "p-2" : "px-5 py-[0.3rem]",
        border: "border-none",
        main: "flex items-center cursor-pointer bg-primary text-prim-text relative",
      },
    },
    styles,
    { text }
  );

  return (
    <Container
      rounded={styles["rounded"] ? styles["rounded"] : "rounded-sm"}
      {...{ theme, disabled, loading, className: className.button, onClick }}
    >
      {children}
      {text && <span className="text-lg block ml-2">{text}</span>}
    </Container>
  );
}

export default Icon;
