import React from "react";
import useStyles from "@/hooks/useStyles";

interface Props {
  theme: string;
  styles: any;
  text: string;
}

function Badge({ theme = "primary", styles = {}, text }: Props) {
  const className = useStyles(
    {
      badge: {
        padding: "px-4 py-2",
        shadow: "shadow-md",
        rounded: "rounded",
        border: "border-solid border-border",
        text: "text-sm",
        main: "bg-primary text-prim-text",
      },
    },
    styles
  );

  return <span className={`${className.badge} ${theme}`}>{text}</span>;
}

export default Badge;
