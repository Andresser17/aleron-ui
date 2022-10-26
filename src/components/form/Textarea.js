import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function Textarea({
  palette = "light",
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
  // Styles
  const notEmptyStyle = "al-text-[0.6rem] al-top-[0.125rem]";
  const disabledStyle = "disabled:al-opacity-90 disabled:al-shadow-md";
  const focusStyle =
    "focus:al-outline focus:al-outline-1 focus:al-outline-outline focus:al-shadow-lg";
  const inputStyles = `${
    error?.message.length > 0 ? "al-bg-red-200" : "al-bg-bg"
  } al-text-text al-h-48 al-p-4 al-w-full al-shadow-md al-rounded-sm al-border-none hover:al-shadow-lg placeholder:al-text-black/0 ${focusStyle} ${disabledStyle}`;

  return (
    <label
      className={`al-flex al-flex-col al-items-start al-relative al-text-sm ${palette}`}
      htmlFor={props.name}
    >
      <textarea
        className={inputStyles}
        {...{
          disabled,
          readOnly,
          placeholder,
          ...field,
          value: field.value || "",
        }}
      />
      {/* Placeholder */}
      <span
        className={`al-text-gray-400 al-absolute ${
          field.value ? notEmptyStyle : "al-top-[16px]"
        } al-pointer-events-none al-duration-500 al-left-4`}
      >
        {placeholder}
      </span>
      {/* Description */}
      <span
        className={`al-text-[0.7rem] al-my-1 ${
          error?.message ? "al-text-bg danger" : "al-text-text primary"
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}
Textarea.propTypes = {
  palette: PropTypes.string,
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
