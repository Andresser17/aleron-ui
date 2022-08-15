import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as SearchIcon } from "icons/search-icon.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Search({
  palette = "light",
  placeholder = "Search",
  disabled,
  readOnly,
  defaultValue,
  required,
  name,
}) {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  // Styles
  const styles =
    "bg-bg text-text p-4 w-full shadow-md rounded-sm disabled:opacity-90 disabled:shadow-md placeholder:text-black/30";
  // Refs
  const inputRef = useRef();

  // check if input is focus
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

  // delete input value
  const deleteValue = () => setValue("");

  // set default value
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    // const mergeStatus = (newStatus) =>
    //   setStatus((prev) => ({ ...prev, ...newStatus }));

    setValue(e.target.value);
  };

  return (
    <label
      className={`flex ${
        isFocus ? "outline outline-1" : ""
      } ${styles} ${palette}`}
      htmlFor={name}
    >
      <SearchIcon
        className={`w-6 h-6 mr-2 ${isFocus ? "text-text" : "text-zinc-400"}`}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        type="search"
        className="w-full bg-black/0 focus:outline-none"
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
          inputRef.current?.value ? "visible" : "invisible"
        }`}
      />
    </label>
  );
}
Search.propTypes = {
  palette: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default Search;
