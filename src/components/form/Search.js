import React, { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as SearchIcon } from "icons/search-icon.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Search({
  palette = "light",
  placeholder = "Search",
  disabled,
  readOnly,
  required,
  setValue = (name, value) => undefined,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController(props);
  // Styles
  const focusStyle = "al-outline al-outline-1 al-outline-outline al-shadow-lg";
  const containerStyles = `al-bg-bg al-text-text al-cursor-text al-p-4 al-w-full al-shadow-md al-rounded-sm disabled:al-opacity-90 disabled:al-shadow-md placeholder:al-text-black/30`;
  // Refs
  const inputRef = useRef();

  // delete input value
  const deleteValue = () => setValue(props.name, "");

  return (
    <label
      className={`al-flex ${
        isFocus ? focusStyle : ""
      } ${containerStyles} ${palette}`}
      onClick={() => {
        if (disabled) return;
        if (!isFocus) setIsFocus(true);
        inputRef.current.focus();
      }}
      onBlur={() => {
        setIsFocus(false);
      }}
      htmlFor={props.name}
    >
      <SearchIcon
        className={`al-w-6 al-h-6 al-mr-2 ${
          isFocus ? "al-text-text" : "al-text-zinc-400"
        }`}
      />
      <input
        type="search"
        className="al-w-full al-text-text al-border-none al-bg-black/0 focus:al-outline-none"
        {...{
          disabled,
          readOnly,
          placeholder,
          ...{
            ...field,
            ref(e) {
              field.ref(e);
              inputRef.current = e;
            },
          },
          value: field.value || "",
        }}
      />
      <DeleteIcon
        onClick={deleteValue}
        className={`al-w-6 al-h-6 al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer ${
          field.value ? "al-visible" : "al-invisible"
        }`}
      />
    </label>
  );
}
Search.propTypes = {
  palette: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Search;
