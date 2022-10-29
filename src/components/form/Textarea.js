import React from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function Textarea({
  theme = "primary",
  styles = {},
  description = "",
  placeholder,
  disabled,
  readOnly,
  ...props
}) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const containerClassName = useStyles(
    { width: "w-64", height: "h-36" },
    {
      main: `flex flex-col items-start relative text-sm ${theme}`,
    },
    styles
  );
  const placeholderClassName = useStyles(
    {},
    {
      notEmpty: field.value ? "text-[0.6rem] top-[0.125rem]" : "top-[16px]",
      main: "text-gray-400 absolute pointer-events-none duration-500 left-4",
    }
  );
  const inputClassName = useStyles(
    {},
    {
      focus:
      "focus:outline focus:outline-1 focus:outline-border focus:shadow-lg",
      disabled: "disabled:opacity-90 disabled:shadow-md",
      error: error?.message.length > 0 ? "bg-red-400" : "bg-card",
      main: "text-text p-4 w-full h-full shadow-md rounded-sm border-none hover:shadow-lg placeholder:text-black/0",
    }
  );

  return (
    <label className={containerClassName} htmlFor={props.name}>
      <textarea
        className={inputClassName}
        {...{
          disabled,
          readOnly,
          placeholder,
          ...field,
          value: field.value || "",
        }}
      />
      {/* Placeholder */}
      <span className={placeholderClassName}>{placeholder}</span>
      {/* Description */}
      <span
        className={`text-xs my-1 ${
          error?.message ? "text-bg danger" : "text-text primary dark:dark"
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}
Textarea.propTypes = {
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

export default Textarea;
