import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Input({
  palette = "primary",
  getData,
  placeholder,
  disabled,
  readOnly,
  type = "text",
  description,
  defaultValue,
  required,
  id,
}) {
  const [data, setData] = useState("");
  const [status, setStatus] = useState({ code: 0, message: "" });
  const notEmptyStyle = "al-text-[0.7rem] al-top-[0.125rem]";
  const styles = `${
    status.code === 1
      ? "al-bg-green-200"
      : status.code === 2
      ? "al-bg-red-200"
      : "al-bg-gray-100"
  } al-p-4 al-w-full al-shadow-md al-rounded-sm hover:al-shadow-lg active:al-shadow-xl focus:al-outline-none disabled:al-opacity-90 disabled:al-shadow-md placeholder:al-text-black/0 ${palette}`;

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setData(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const mergeStatus = (newStatus) =>
      setStatus((prev) => ({ ...prev, ...newStatus }));

    getData(e.target.value, mergeStatus);
    setData(e.target.value);
  };

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label
      className="al-flex al-flex-col al-items-start al-relative al-text-sm"
      htmlFor={id}
    >
      <input
        value={data}
        onChange={handleChange}
        className={styles}
        {...{
          disabled,
          type,
          readOnly,
          required,
          placeholder,
          id,
        }}
      />
      {/* Description */}
      <span
        className={`al-text-gray-400 al-absolute ${
          data.length > 0 ? notEmptyStyle : "al-top-[0.9rem]"
        } al-pointer-events-none al-duration-500 al-left-4`}
      >
        {placeholder}
      </span>
      <span
        className={`${
          status.code === 1 && status.message.length > 0
            ? "al-text-bg success"
            : status.code === 2 && status.message.length > 0
            ? "al-text-bg danger"
            : "al-text-gray-400"
        } al-mt-1`}
      >
        {status.code > 0 && status.message.length > 0
          ? status.message
          : description}
      </span>
    </label>
  );
}
Input.propTypes = {
  palette: PropTypes.string,
  getData: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  description: PropTypes.string,
};

export default Input;
