import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function Input({
  palette = "light",
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
  // Styles
  const notEmptyStyle = "al-text-[0.6rem] al-top-[0.125rem]";
  const disabledStyle = "disabled:al-opacity-90 disabled:al-shadow-md";
  const inputStyle = `${
    error?.message.length > 0 ? "al-bg-red-200" : "al-bg-bg"
  } al-text-text al-p-4 al-w-full al-shadow-md al-rounded-sm al-border-none hover:al-shadow-lg active:al-shadow-xl focus:al-outline-none placeholder:al-text-black/0 ${disabledStyle} ${palette}`;

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label
      className="al-flex al-flex-col al-items-start al-relative al-text-sm"
      htmlFor={props.name}
    >
      <input
        className={inputStyle}
        {...{
          disabled,
          type,
          readOnly,
          placeholder,
          ...field,
          value: field.value ? field.value : "",
        }}
      />
      {/* Placeholder */}
      <span
        className={`al-text-gray-400 al-absolute ${
          field.value.length > 0 ? notEmptyStyle : "al-top-[0.9rem]"
        } al-pointer-events-none al-duration-500 al-left-4`}
      >
        {placeholder}
      </span>
      {/* Description */}
      <span className="al-text-bg danger al-mt-1">
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : ""}
      </span>
    </label>
  );
}
Input.propTypes = {
  palette: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  rules: PropTypes.object,
};

export default Input;
