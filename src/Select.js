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
        option.value === selected ? "bg-active" : ""
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
  disabled,
  readOnly,
  defaultValue,
  required,
  name,
}) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [isFocus, setIsFocus] = useState(false);
  // Refs
  const containerRef = useRef();
  const inputRef = useRef();

  // check if input is focus, add focus to label
  useEffect(() => {
    const addClass = () =>
      document.activeElement === inputRef.current && setIsFocus(true);
    const removeClass = () => setIsFocus(false);
    document.addEventListener("focusin", addClass);
    document.addEventListener("focusout", removeClass);

    return () => {
      document.removeEventListener("focusin", addClass);
      document.removeEventListener("focusout", removeClass);
    };
  }, []);

  // toggle dropdown
  const handleDropdown = () => setShowDropdown((prev) => !prev);

  // delete input and selected value
  const deleteValue = () => {
    setValue("");
    setSelected({ label: "", value: "" });
  };

  // change value if option is selected
  useEffect(() => {
    if (selected.label && selected.label.length > 0) setValue(selected.label);
  }, [selected, value]);

  // set default value
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  // Hide modal if user click outside
  const handleOutsideClick = (e) => {
    if (e.target === containerRef.current) setShowDropdown(false);
  };

  // Manage outside module click
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    // Unmount listener
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    // const mergeStatus = (newStatus) =>
    //   setStatus((prev) => ({ ...prev, ...newStatus }));

    setValue(e.target.value);
  };

  return (
    <>
      <label
        className={`flex bg-bg text-text cursor-text p-4 w-full shadow-md rounded-sm relative z-10 ${
          isFocus ? "outline outline-1" : ""
        } ${palette}`}
        htmlFor={name}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          type="search"
          className="w-full bg-black/0 focus:outline-none placeholder:text-black/30"
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
        {isFocus ? (
          <TopArrow
            onClick={() => setIsFocus((prev) => !prev)}
            className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
          />
        ) : (
          <BottomArrow
            onClick={() => setIsFocus((prev) => !prev)}
            className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
          />
        )}
        {isFocus && (
          <Dropdown options={options} {...{ selected, setSelected }} />
        )}
      </label>
      {/* Handle outside click */}
      {isFocus && (
        <span
          ref={containerRef}
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
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default Select;
