import React from "react";
import useStyles from "@/hooks/useStyles";
// Icons
import { GrCheckmark as CheckmarkIcon } from "react-icons/gr";

interface Props {
  styles: any;
  option: { label: string; value: string };
  isSelected: boolean;
  setSelected: (value: { label: string; value: string }) => void;
}

function Option({ styles, option, isSelected, setSelected }: Props) {
  const className = useStyles(
    {
      option: {
        hover: "hover:bg-card/90",
        focus: "focus:bg-card/70",
        padding: "p-4",
        main: "flex justify-between cursor-pointer text-left",
      },
    },
    styles
  );

  return (
    <span
      className={className.option}
      onClick={() => !isSelected && setSelected(option)}
    >
      {option.label}
      {isSelected && <CheckmarkIcon className="w-4 h-4" />}
    </span>
  );
}

export default Option;
