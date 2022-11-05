import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Option({ styles, option, selected, setSelected }) {
  const className = useStyles(
    {
      option: {
        hover: "hover:bg-card/90",
        focus: "focus:bg-card/70",
        selected: option.value === selected.value ? "bg-card/70" : "",
        padding: "p-4",
        main: "cursor-pointer text-left block",
      },
    },
    styles,
    { option, selected }
  );

  return (
    <span className={className.option} onClick={() => setSelected(option)}>
      {option.label}
    </span>
  );
}

function Dropdown({
  styles,
  search = false,
  inputValue = "",
  options,
  selected,
  setSelected,
}) {
  const className = useStyles(
    {
      dropdown: {
        dimen: "w-full",
        position: "absolute top-[110%] left-0 z-10",
        main: "shadow-lg rounded-sm bg-card text-text",
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
        .map((op) => (
          <Option
            key={op.value}
            option={op}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </div>
  );
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
}) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [isFocus, setIsFocus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const className = useStyles(
    {
      container: {
        dimen: "w-64",
        main: "text-text text-sm relative z-10",
      },
      input: {
        dimen: "w-full",
        focus: "focus:outline-none",
        placeholder: "placeholder:text-black/0",
        main: "text-text flex-auto bg-black/0 border-none",
      },
      inputContainer: {
        focus: isFocus ? "outline outline-1" : "",
        disabled: disabled ? "pointer-events-none" : "",
        padding: "p-4",
        rounded: "rounded-sm",
        main: "flex bg-card cursor-text shadow-md",
      },
      placeholder: {
        text: `left-[15px] ${
          field.value ? "text-[0.7rem] top-[0.125rem]" : "top-[19px]"
        }`,
        main: "text-gray-400 absolute pointer-events-none duration-500",
      },
    },
    styles,
    { isFocus, disabled, value: field.value }
  );
  // Refs
  const containerRef = useRef();
  const outsideSpanRef = useRef();
  const inputRef = useRef();

  // delete input and selected value
  const deleteValue = (e) => {
    e.stopPropagation();
    setValue(props.name, "");
    setSelected({ label: "", value: "" });
    getSelected({ label: "", value: "" });
  };

  const handleSelection = (option) => {
    if (isSearching) setIsSearching(false);
    setShowDropdown(false);
    setSelected(option);
    getSelected(option);
    setValue(props.name, option.label);
  };

  return (
    <>
      <div className={className.container}>
        <div
          tabIndex="1"
          aria-disabled={disabled}
          ref={containerRef}
          onClick={() => {
            if (disabled) return;
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={className.inputContainer}
        >
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
                if (!isSearching) setIsSearching(true);
                field.onChange(e);
              },
              value: field.value || "",
            }}
          />
          <DeleteIcon
            onClick={deleteValue}
            className={`w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer ${
              field.value ? "visible" : "invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow className="w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          ) : (
            <BottomArrow className="w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          )}
        </div>
        {showDropdown && (
          <Dropdown
            search={isSearching}
            inputValue={field.value}
            options={options}
            {...{ styles, selected, setSelected: handleSelection }}
          />
        )}
        {/* Placeholder */}
        <span className={className.placeholder}>{placeholder}</span>
      </div>
      {/* Handle outside click */}
      {isFocus && (
        <span
          onClick={() => {
            setShowDropdown(false);
            setIsFocus(false);
          }}
          ref={outsideSpanRef}
          className="fixed block top-0 left-0 w-full h-full bg-black/0"
        ></span>
      )}
    </>
  );
}
Select.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.object,
  getSelected: PropTypes.func,
  setValue: PropTypes.func,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default Select;
