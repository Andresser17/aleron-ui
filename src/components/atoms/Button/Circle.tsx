import React from "react";
import useStyles from "@/hooks/useStyles";
// Components
import Container from "./Container";

interface Props {
  theme: string;
  styles: any;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
  children: React.Node;
}

function Circle({
  theme = "primary",
  styles = {},
  disabled,
  loading,
  onClick,
  children,
}: Props) {
  const className = useStyles(
    {
      button: {
        dimen: "w-10 h-10",
        hover: "hover:bg-primary/90",
        active: "active:bg-primary/80",
        focus:
          "focus:outline focus:outline-1 focus:bg-primary/70 focus:outline-border",
        disabled: "disabled:bg-primary/50 disabled:cursor-auto",
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

export default Circle;
