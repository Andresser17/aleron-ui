import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as ErrorIcon } from "icons/error-icon.svg";

function Tag({ text, close, readOnly }) {
  return (
    <span className="al-flex al-bg-bg al-text-text al-px-2 al-rounded-sm al-text-sm al-mr-1">
      {text}
      {/* close tag */}
      {!readOnly && (
        <ErrorIcon
          onClick={close}
          className="al-ml-1 al-cursor-pointer al-w-4"
        />
      )}
    </span>
  );
}

function Tags({ tags, deleteTag, readOnly }) {
  const mapped = tags.map((tag, i) => (
    <Tag
      key={`${tag.replaceAll(" ", "-")}-${i}`}
      text={tag}
      close={() => deleteTag(i)}
      {...{ readOnly }}
    />
  ));

  return <>{mapped}</>;
}

function InputTag({
  palette = "primary",
  getInput,
  getTags,
  getRef,
  placeholder,
  disabled,
  defaultTags,
  readOnly,
  type = "text",
  description,
  required,
  id,
}) {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState({ code: 0, message: "" });
  const disabledStyle = `al-opacity-90 al-pointer-events-none`;
  const styles = `${
    status.code === 1
      ? "al-bg-green-200"
      : status.code === 2
      ? "al-bg-red-200"
      : "al-bg-gray-100"
  } al-p-4 al-w-full al-shadow-md ${
    disabled ? disabledStyle : ""
  } al-rounded-sm hover:al-shadow-lg active:al-shadow-xl al-flex al-p-4 al-flex-wrap`;

  useEffect(() => {
    if (defaultTags && defaultTags.length > 0) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  const handleChange = (e) => {
    getInput(e.target.value, mergeData);
    setValue(e.target.value);
  };

  const handleTagClose = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    // Delete tag in parent state
    getTags([...newTags], mergeData);
  };

  const mergeData = (newStatus, newValue) => {
    setStatus((prev) => ({ ...prev, ...newStatus }));
    if (!newValue || newValue.length === 0) return;
    setValue([...newValue]);
  };

  // add tag when user click enter
  const addTag = ({ key }) => {
    if (key === "Enter") {
      if (value.length === 0) return;
      if (status.code === 2) return;
      setTags([...tags, value]);
      getTags([...tags, value]);
      setValue("");
    }
  };

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label
      className={`al-flex al-flex-col al-items-start al-text-sm al-w-full ${palette}`}
      htmlFor={id}
    >
      <div className={styles} aria-disabled={disabled}>
        <Tags readOnly={readOnly} tags={tags} deleteTag={handleTagClose} />
        <input
          onKeyPress={addTag}
          value={value}
          onChange={handleChange}
          className="al-bg-black/0 al-w-auto al-flex-auto al-inline-block focus:al-outline-none placeholder:al-text-gray-400"
          {...{
            disabled,
            type,
            readOnly,
            required,
            placeholder,
            id,
          }}
        />
      </div>
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
InputTag.propTypes = {
  palette: PropTypes.string,
  getInput: PropTypes.func,
  getTags: PropTypes.func,
  getRef: PropTypes.func,
  placeholder: PropTypes.string,
  defaultTags: PropTypes.array,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  description: PropTypes.string,
};

export default InputTag;
