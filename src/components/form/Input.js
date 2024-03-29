import React from "react";
import { useController } from "react-hook-form";
import useStyles from "hooks/useStyles";
import PropTypes from "prop-types";

function Input({
  theme = "primary",
  styles = {},
  description = "",
  placeholder,
  disabled,
  readOnly,
  type = "text",
  ...props
}) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const className = useStyles(
    {
      label: {
        dimen: "w-64",
        main: "flex flex-col items-start relative text-sm",
      },
      input: {
        dimen: "w-full",
        hover: "hover:shadow-lg",
        focus:
          "focus:outline focus:outline-1 focus:outline-outline focus:shadow-lg",
        placeholder: "placeholder:text-black/0",
        disabled: "disabled:opacity-90 disabled:shadow-md",
        rounded: "rounded-sm",
        border: "border-none",
        main: "text-text p-4 shadow-md",
        error: error?.message.length > 0 ? "bg-red-200" : "bg-card",
      },
    },
    styles
  );

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label className={`${className.label} ${theme}`} htmlFor={props.name}>
      <input
        className={className.input}
        {...{
          disabled,
          type,
          readOnly,
          placeholder,
          ...field,
          value: field.value || "",
        }}
      />
      {/* Placeholder */}
      <span
        className={`text-gray-400 absolute ${
          field.value ? "text-[0.6rem] top-[0.125rem]" : "top-[16px]"
        } pointer-events-none duration-500 left-[15.5px]`}
      >
        {placeholder}
      </span>
      {/* Description */}
      <span
        className={`text-[0.7rem] my-1 ${
          error?.message ? "text-red-600" : "text-text dark:dark"
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}
Input.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  name: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  rules: PropTypes.object,
};

export default Input;
