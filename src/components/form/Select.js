import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Option({ option, selected, setSelected }) {
  return (
    <span
      className={`al-w-full al-p-4 al-cursor-pointer al-text-left al-block hover:al-bg-hover focus:al-bg-focus ${
        option.value === selected.value ? "al-bg-active" : ""
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
    <div className="al-w-full al-shadow-lg al-rounded-sm al-absolute al-top-[110%] al-left-0 al-bg-bg al-text-text al-z-10">
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
  palette = "light",
  options = [],
  placeholder = "Search",
  disabled,
  defaultValue,
  required,
  name,
}) {
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [isFocus, setIsFocus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Refs
  const containerRef = useRef();
  const outsideSpanRef = useRef();
  const inputRef = useRef();

  // delete input and selected value
  const deleteValue = (e) => {
    e.stopPropagation();
    setValue("");
    setSelected({ label: "", value: "" });
  };

  // set default value
  useEffect(() => {
    if (defaultValue && defaultValue.label.length > 0) {
      setValue(defaultValue.label);
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const handleSelection = (option) => {
    if (isSearching) setIsSearching(false);
    setShowDropdown(false);
    setSelected(option);
    setValue(option.label);
  };

  const handleChange = (e) => {
    if (!isSearching) setIsSearching(true);
    setValue(e.target.value);
  };

  return (
    <>
      <div className={`al-bg-bg al-text-text al-relative al-z-10 ${palette}`}>
        <div
          aria-disabled={disabled}
          ref={containerRef}
          onClick={() => {
            if (disabled) return;
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={`al-flex al-cursor-text al-p-4 al-w-full al-shadow-md al-rounded-sm ${
            isFocus ? "al-outline al-outline-1" : ""
          } ${disabled ? "al-pointer-events-none" : ""}`}
        >
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            type="search"
            className="al-w-full al-bg-black/0 focus:al-outline-none placeholder:al-text-black/0"
            {...{
              disabled,
              required,
              placeholder,
              name,
            }}
          />
          <DeleteIcon
            onClick={deleteValue}
            className={`al-w-6 al-h-6 al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer ${
              value ? "al-visible" : "al-invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow
              className={`al-w-6 al-h-6 al-ml-2 al-text-black/30 hover:al-text-text al-cursor-pointer`}
            />
          ) : (
            <BottomArrow
              className={`al-w-6 al-h-6 al-ml-2 al-text-black/30 hover:al-text-text al-cursor-pointer`}
            />
          )}
        </div>
        {showDropdown && (
          <Dropdown
            search={isSearching}
            inputValue={value}
            options={options}
            {...{ selected, setSelected: handleSelection }}
          />
        )}
        <span
          className={`al-text-gray-400 al-absolute ${
            value.length > 0 ? "al-text-[0.7rem] al-top-[0.125rem]" : "al-top-[1rem]"
          } al-pointer-events-none al-duration-500 al-left-4`}
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
          className="al-fixed al-block al-top-0 al-left-0 al-w-full al-h-full al-bg-black/0"
        ></span>
      )}
    </>
  );
}
Select.propTypes = {
  palette: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.object,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default Select;
