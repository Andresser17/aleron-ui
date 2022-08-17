import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function Input({
  palette = "primary",
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
  const styles = `${
    error?.message.length > 0 ? "al-bg-red-200" : "al-bg-gray-100"
  } al-p-4 al-w-full al-shadow-md al-rounded-sm hover:al-shadow-lg active:al-shadow-xl focus:al-outline-none disabled:al-opacity-90 disabled:al-shadow-md placeholder:al-text-black/0 ${palette}`;

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label
      className="al-flex al-flex-col al-items-start al-relative al-text-sm"
      htmlFor={name}
    >
      <input
        className={styles}
        {...{
          disabled,
          type,
          readOnly,
          placeholder,
          name,
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
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

export default Input;
