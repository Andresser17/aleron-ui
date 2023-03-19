import React from "react";

interface Props {
  palette: string;
  text: string;
  rounded: boolean;
  border: boolean;
}

export default function Badge({ palette, text, rounded, border }: Props) {
  // If rounded is not provided, is equal
  const optRounded = rounded ? "rounded-3xl" : "rounded-sm";
  // If border is active
  const optBorder = border ? "border-solid border-border border" : "";

  return (
    <span
      className={`bg-bg text-text px-4 py-[0.08rem] shadow-md ${optRounded} ${optBorder} ${palette}`}
    >
      {text}
    </span>
  );
}
