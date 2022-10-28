import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
// Icons
import { ReactComponent as ErrorIcon } from "icons/error-icon.svg";
import PropTypes from "prop-types";

function Tag({ text, close, readOnly }) {
  return (
    <span className="flex bg-primary text-prim-text px-2 rounded-sm text-sm mr-1 mb-2">
      {text}
      {/* close tag */}
      {!readOnly && (
        <ErrorIcon onClick={close} className="ml-1 cursor-pointer w-4" />
      )}
    </span>
  );
}

function Tags({ tags, deleteTag, readOnly }) {
  const mapped = tags.map((tag, i) => (
    <Tag key={tag} text={tag} close={() => deleteTag(i)} {...{ readOnly }} />
  ));

  return mapped;
}

function InputTag({
  theme = "primary",
  styles = {},
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
  const containerClassName = useStyles(
    {
      width: "w-64",
      hover: "hover:shadow-lg p-4 flex flex-wrap cursor-text",
      focus: isFocus
        ? "outline outline-1 outline-border shadow-lg"
        : "shadow-md",
      disabled: disabled ? "opacity-90 pointer-events-none" : "",
    },
    {
      main: "text-text p-4 rounded-sm",
      error: error?.message.length > 0 ? "bg-red-400" : "bg-card",
    },
    styles
  );
  // Refs
  const inputRef = useRef(null);
  const containerRef = useRef(null);

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
      // check if tag is duplicated
      if (tags.length > 0 && tags.find((tag) => tag === field.value)) return;

      setTags([...tags, field.value]);
      // clean input
      setValue(props.name, "");
    }
  };

  return (
    <label
      className={`flex flex-col items-start text-sm text-text w-fit ${theme}`}
      htmlFor={props.name}
    >
      <div
        className={containerClassName}
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
        <Tags readOnly={readOnly} tags={tags} deleteTag={handleTagClose} />
        <input
          onKeyPress={addTag}
          className="text-text bg-black/0 border-none w-auto flex-auto inline-block focus:outline-none placeholder:text-gray-400"
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
        className={`text-xs my-1 ${
          error?.message ? "text-red-600" : "text-text dark:dark"
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}
InputTag.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
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
