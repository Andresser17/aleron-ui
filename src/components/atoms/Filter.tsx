import React, { useState } from "react";
import useStyles from "@/hooks/useStyles";

interface Props {
  theme: string;
  options: Array<string>;
  onClick: () => void;
}

export default function Filter({
  theme = "primary",
  styles,
  options = [],
  onClick = (value) => undefined,
}: Props) {
  const [active, setActive] = useState(0);
  const className = useStyles(
    {
      container: {
        main: "flex",
      },
      tab: {
        padding: "py-2 px-6",
        border: "border-solid border-2",
        font: "text-sm font-bold",
        main: "block text-text cursor-pointer",
      },
    },
    styles
  );
  // If item is active
  const activeStyle = "text-primary border-primary hover:border-hover";
  const defaultStyle = "border-black/30 hover:border-black/40";

  const handleClick = (e, index) => {
    setActive(index);
    const value = e.target.textContent.toLowerCase();
    onClick(value);
  };

  const mapped =
    options.length > 0 &&
    options.map((op, i) => {
      const isActive = active === i ? activeStyle : defaultStyle;
      const dinamicRounded =
        i === 0 ? "rounded-l" : i === options.length - 1 ? "rounded-r" : "";

      return (
        <span
          onClick={(e) => handleClick(e, i)}
          key={op}
          className={`${isActive} ${dinamicRounded} ${className.tab}`}
        >
          {op}
        </span>
      );
    });

  return <div className={`${className.container} ${theme}`}>{mapped}</div>;
}
