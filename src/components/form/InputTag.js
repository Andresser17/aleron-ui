import React, { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as ErrorIcon } from "icons/error-icon.svg";

function Tag({ palette, text, close, readOnly }) {
  return (
    <span
      className={`al-flex al-bg-bg al-text-text al-px-2 al-rounded-sm al-text-sm al-mr-1 al-mb-2 ${palette}`}
    >
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

function Tags({ palette, tags, deleteTag, readOnly }) {
  const mapped = tags.map((tag, i) => (
    <Tag
      key={`${tag.replaceAll(" ", "-")}-${i}`}
      text={tag}
      close={() => deleteTag(i)}
      {...{ readOnly, palette }}
    />
  ));

  return mapped;
}

function InputTag({
  palette = "light",
  tagsPalette = "primary",
  tags = [],
  setTags,
  maxTags = 5,
  placeholder,
  setValue = (name, value) => undefined,
  disabled,
  readOnly,
  description,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController(props);
  // Styles
  const disabledStyle = `al-opacity-90 al-pointer-events-none`;
  const focusStyle = "al-outline al-outline-1 al-shadow-lg al-outline-outline";
  const containerStyles = `${
    error?.message.length > 0 ? "al-bg-red-200" : "al-bg-bg"
  } al-text-text al-p-4 al-w-full ${
    disabled ? disabledStyle : ""
  } al-rounded-sm hover:al-shadow-lg al-p-4 al-flex al-flex-wrap al-cursor-text ${
    isFocus ? focusStyle : "al-shadow-md"
  }`;
  // Refs
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // add focus to container
  useEffect(() => {}, []);

  // delete tag when user click close button
  const handleTagClose = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  // add tag when user click enter
  const addTag = ({ target, key }) => {
    if (key === "Enter") {
      if (tags.length >= maxTags) return;
      if (!field.value || field.value.length === 0) return;
      if (error?.message.length > 0) return;

      setTags([...tags, field.value]);
      // clean input
      setValue(props.name, "");
    }
  };

  return (
    <label
      className={`al-flex al-flex-col al-items-start al-text-sm al-text-text al-w-full ${palette}`}
      htmlFor={props.name}
    >
      <div
        className={containerStyles}
        aria-disabled={disabled}
        ref={containerRef}
        onClick={() => {
          if (disabled) return;
          if (!isFocus) setIsFocus(true);
          inputRef.current.focus();
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      >
        <Tags
          palette={tagsPalette}
          readOnly={readOnly}
          tags={tags}
          deleteTag={handleTagClose}
        />
        <input
          onKeyPress={addTag}
          className="al-text-text al-bg-black/0 al-border-none al-w-auto al-flex-auto al-inline-block focus:al-outline-none placeholder:al-text-gray-400"
          type="text"
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
            value: field.value ? field.value : "",
          }}
        />
      </div>
      {/* Description */}
      <span
        className={`al-text-[0.7rem] al-my-1 ${
          error?.message ? "al-text-bg danger" : "al-text-bg"
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}
InputTag.propTypes = {
  palette: PropTypes.string,
  tagsPalette: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.array,
  setTags: PropTypes.func,
  maxTags: PropTypes.number,
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default InputTag;
