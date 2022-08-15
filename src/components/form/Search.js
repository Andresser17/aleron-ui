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
    "al-bg-bg al-text-text al-p-4 al-w-full al-shadow-md al-rounded-sm disabled:al-opacity-90 disabled:al-shadow-md placeholder:al-text-black/30";
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
      className={`al-flex ${
        isFocus ? "al-outline al-outline-1" : ""
      } ${styles} ${palette}`}
      htmlFor={name}
    >
      <SearchIcon
        className={`al-w-6 al-h-6 al-mr-2 ${
          isFocus ? "al-text-text" : "al-text-zinc-400"
        }`}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        type="search"
        className="al-w-full al-bg-black/0 focus:al-outline-none"
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
        className={`al-w-6 al-h-6 al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer ${
          inputRef.current?.value ? "al-visible" : "al-invisible"
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
