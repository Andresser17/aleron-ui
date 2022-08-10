import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Option({ option, selected, setSelected }) {
  return (
    <span
      className={`w-full p-4 cursor-pointer text-left block hover:bg-hover focus:bg-focus ${
        option.value === selected.value ? "bg-active" : ""
      }`}
      onClick={() => setSelected(option)}
    >
      {option.label}
    </span>
  );
}

function Dropdown({ options, selected, setSelected }) {
  return (
    <>
      <div className="w-full shadow-lg rounded-sm absolute top-[110%] left-0 bg-bg text-text z-10">
        {options.map((op) => (
          <Option
            key={op.value}
            option={op}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
}

function Select({
  palette = "light",
  options = [],
  placeholder = "Search",
  multiple = false,
  disabled,
  readOnly,
  defaultValue,
  required,
  name,
}) {
  const [value, setValue] = useState("");
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
    if (defaultValue && defaultValue.length > 0) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSelection = (option) => {
    if (!multiple) setShowDropdown(false);
    setSelected(option);
    setValue(option.label);
  };

  const handleChange = (e) => {
    // const mergeStatus = (newStatus) =>
    //   setStatus((prev) => ({ ...prev, ...newStatus }));

    setValue(e.target.value);
  };

  return (
    <>
      <div className={`bg-bg text-text relative z-10 ${palette}`}>
        <div
          ref={containerRef}
          onClick={() => {
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={`flex cursor-text p-4 w-full shadow-md rounded-sm ${
            isFocus ? "outline outline-1" : ""
          }`}
        >
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            type="search"
            className="w-full bg-black/0 focus:outline-none placeholder:text-black/0"
            {...{
              disabled,
              readOnly,
              required,
              placeholder,
              name,
            }}
          />
          <DeleteIcon
            onClick={deleteValue}
            className={`w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer ${
              value ? "visible" : "invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow
              className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
            />
          ) : (
            <BottomArrow
              className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
            />
          )}
        </div>
        {showDropdown && (
          <Dropdown
            options={options}
            {...{ selected, setSelected: handleSelection }}
          />
        )}
        <span
          className={`text-gray-400 absolute ${
            value.length > 0 ? "text-[0.7rem] top-[0.125rem]" : "top-[1rem]"
          } pointer-events-none duration-500 left-4`}
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
  palette: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default Select;
