import React, { useState, useEffect } from "react";
// Components
import InputDropdown from "@/components/organisms/InputDropdown";

interface Props {
  theme: string;
  styles: any;
  options: Array<{ label: string; value: string }>;
  placeholder: string;
  disabled: boolean;
  defaultValue: { label: string; value: string };
  getSelected: (selected: { label: string; value: string }) => void;
  setValue: (value: string) => void;
  required: boolean;
  name: string;
}

function Select({
  theme = "primary",
  styles = {},
  options = [],
  placeholder = "Search",
  getSelected = (selected) => undefined,
  disabled,
  setValue = (name, value) => undefined,
  ...props
}: Props) {
  const [selected, setSelected] = useState<Array<string>>([]);

  const handleSelected = (option) => {
    setSelected([option]);
    getSelected(option);
    setValue(props.name, option.label);
  };

  useEffect(() => {
    if (options.length > 0 && selected.length === 0) {
      options.forEach((op) => {
        if (op.selected) handleSelected(op);
      });
    }
  }, [options, selected, handleSelected]);

  return (
    <InputDropdown
      theme={theme}
      styles={styles}
      options={options}
      optionsSelected={selected}
      handleSelected={handleSelected}
      setValue={setValue}
      {...props}
    />
  );
}

export default Select;
