import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Option({ option, selected, setSelected }) {
  return (
    <span
      className={`p-4 cursor-pointer text-left block hover:bg-card/90 focus:bg-card/70 ${
        option.value === selected.value ? "bg-card/70" : ""
      }`}
      onClick={() => setSelected(option)}
    >
      {option.label}
    </span>
  );
}

function Dropdown({
  search = false,
  inputValue = "",
  options,
  selected,
  setSelected,
}) {
  return (
    <div className="w-full shadow-lg rounded-sm absolute top-[110%] left-0 bg-card text-text z-10">
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
  const containerClassName = useStyles(
    { width: "w-64" },
    {
      main: `text-text text-sm relative z-10 ${theme}`,
    },
    styles
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
      <div className={containerClassName}>
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
          className={`flex bg-card cursor-text p-4 shadow-md rounded-sm ${
            isFocus ? "outline outline-1" : ""
          } ${disabled ? "pointer-events-none" : ""}`}
        >
          <input
            autoComplete="off"
            type="search"
            className="w-full text-text flex-auto bg-black/0 border-none focus:outline-none placeholder:text-black/0"
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
            {...{ selected, setSelected: handleSelection }}
          />
        )}
        {/* Placeholder */}
        <span
          className={`text-gray-400 absolute ${
            field.value ? "text-[0.7rem] top-[0.125rem]" : "top-[19px]"
          } pointer-events-none duration-500 left-[15px]`}
        >
          {placeholder}
        </span>
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
