import React, { useState, useRef } from "react";
import { useController } from "react-hook-form";
// Hooks
import useStyles from "@/hooks/useStyles";
import useOutsideClick from "@/hooks/useOutsideClick";
// Components
import Dropdown from "@/components/molecules/Dropdown";
// Icons
import {
  IoMdArrowDropup as TopArrow,
  IoMdArrowDropdown as BottomArrow,
  IoMdClose as DeleteIcon,
} from "react-icons/io";

interface Props {
  theme: string;
  styles: any;
  options: Array<{ label: string; value: string }>;
  optionsSelected: Array<{ label: string; value: string }>;
  placeholder: string;
  disabled: boolean;
  handleSelected: (value: { label: string; value: string }) => void;
  setValue: (name: string, value: string) => void;
  children: React.Node;
}

function InputDropdown({
  theme,
  styles,
  options,
  placeholder,
  disabled,
  optionsSelected,
  handleSelected,
  setValue,
  children,
  ...props
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const className = useStyles(
    {
      container: {
        dimen: "w-64",
        focus: isFocus ? "outline outline-1" : "",
        disabled: disabled ? "pointer-events-none" : "",
        padding: "p-4",
        main: "flex flex-wrap bg-card text-text relative rounded-sm shadow-md",
      },
      inputContainer: {
        disabled: disabled ? "pointer-events-none" : "",
        main: "flex cursor-text",
      },
      input: {
        dimen: "w-full",
        focus: "focus:outline-none",
        border: "border-none",
        main: "text-text flex-auto bg-black/0",
      },
    },
    styles,
    { isFocus, disabled }
  );
  // refs
  const inputRef = useRef();
  // remove focus when clicked outside container
  const handleOutsideClick = () => {
    setIsFocus(false);
    setShowDropdown(false);
  };
  const containerRef = useOutsideClick(handleOutsideClick);

  return (
    <div ref={containerRef} className={`${className.container} ${theme}`}>
      {children}
      <div
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (!isFocus) setIsFocus(true);
          if (!showDropdown) setShowDropdown(true);

          inputRef.current.focus();
        }}
        className={className.inputContainer}
      >
        <div className="flex flex-wrap w-full">
          <input
            autoComplete="off"
            type="search"
            className={className.input}
            {...{
              disabled,
              placeholder,
              ...{
                ...field,
                ref(e) {
                  field.ref(e);
                  inputRef.current = e;
                },
              },
              onChange: (e) => {
                e.stopPropagation();
                field.onChange(e.target.value);
              },
              value: field.value ? field.value : "",
            }}
          />
        </div>
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            setValue(props.name, "");
          }}
          className={`w-6 h-6 ml-2 text-zinc-400 cursor-pointer hover:text-text ${
            field.value ? "visible" : "invisible"
          }`}
        />
        <i onClick={() => setShowDropdown((prev) => !prev)}>
          {showDropdown ? (
            <TopArrow className="w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          ) : (
            <BottomArrow className="w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          )}
        </i>
        {showDropdown && (
          <Dropdown
            styles={styles}
            search={isSearching}
            inputValue={field.value}
            options={options}
            optionsSelected={optionsSelected}
            handleSelected={(option) => {
              if (showDropdown) setShowDropdown(false);
              handleSelected(option);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default InputDropdown;
