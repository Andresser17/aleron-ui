import React from "react";
import useStyles from "@/hooks/useStyles";
// Components
import Option from "@/components/atoms/Option";

interface Props {
  styles: any;
  search: boolean;
  inputValue: string;
  options: { label: string; value: string };
  optionsSelected: Array<{ label: string; value: string }>;
  handleSelected: (value: { label: string; value: string }) => void;
}

function Dropdown({
  styles,
  search = false,
  inputValue = "",
  options,
  optionsSelected,
  handleSelected,
}: Props) {
  const className = useStyles(
    {
      dropdown: {
        dimen: "w-full",
        position: "absolute top-[110%] left-0 z-10",
        rounded: "rounded-sm",
        main: "bg-card text-text shadow-lg",
      },
    },
    styles
  );

  return (
    <div className={className.dropdown}>
      {options
        .filter((op) => {
          const filter = inputValue.toUpperCase();
          if (search) {
            if (op.label.toUpperCase().indexOf(filter) > -1) {
              return op;
            }

            return undefined;
          }

          return op;
        })
        .map((op) => {
          const isSelected =
            optionsSelected.filter((selected) => selected.value === op.value)
              .length > 0 || false;

          return (
            <Option
              styles={styles}
              key={op.value}
              option={op}
              isSelected={isSelected}
              setSelected={handleSelected}
            />
          );
        })}
    </div>
  );
}

export default Dropdown;
