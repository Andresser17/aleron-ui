import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as SearchIcon } from "icons/search-icon.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";

function Search({
  theme = "primary",
  styles = {},
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
  const className = useStyles(
    {
      container: {
        dimen: "w-64",
        focus: isFocus ? "outline outline-1 outline-border shadow-lg" : "",
        disabled: "disabled:opacity-90 disabled:shadow-md",
        main: "flex bg-card text-text cursor-text p-4 shadow-md rounded-sm  placeholder:text-gray-400",
      },
      input: {
        dimen: "w-full",
        focus: "focus:outline-none",
        border: "border-none",
        main: "text-text bg-black/0",
      },
    },
    styles,
    { isFocus }
  );
  // Refs
  const inputRef = useRef();

  // delete input value
  const deleteValue = () => setValue(props.name, "");

  return (
    <label
      className={`${className.container} ${theme}`}
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
        className={`w-6 h-6 mr-2 ${isFocus ? "text-text" : "text-zinc-400"}`}
      />
      <input
        type="search"
        className={className.input}
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
        className={`w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer ${
          field.value ? "visible" : "invisible"
        }`}
      />
    </label>
  );
}
Search.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Search;
