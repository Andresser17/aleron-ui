import React, { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import useStyles from "@/hooks/useStyles";
import Tag from "@/components/atoms/Tag";

interface Props {
  theme: string;
  styles: any;
  description: string;
  name: string;
  tags: Array<string>;
  setTags: () => void;
  maxTags: number;
  placeholder: string;
  setValue: (name: string, value: string | number | boolean) => void;
  disabled: boolean;
  readOnly: boolean;
}

function InputTag({
  theme = "primary",
  styles = {},
  description,
  tags = [],
  setTags,
  maxTags = 5,
  placeholder,
  setValue = (name, value) => undefined,
  disabled,
  readOnly,
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
        hover: "hover:shadow-lg p-4 flex flex-wrap cursor-text",
        focus: isFocus
          ? "outline outline-1 outline-border shadow-lg"
          : "shadow-md",
        disabled: disabled ? "opacity-90 pointer-events-none" : "",
        main: "text-text p-4 rounded-sm",
        error: error?.message.length > 0 ? "bg-red-400" : "bg-card",
      },
      label: {
        dimen: "w-fit",
        main: "flex flex-col items-start text-sm text-text",
      },
      input: {
        dimen: "w-auto",
        focus: "focus:outline-none",
        placeholder: "placeholder:text-gray-400",
        main: "text-text bg-black/0 border-none w-auto flex-auto inline-block",
      },
    },
    styles,
    {
      isFocus,
      disabled,
      error,
    }
  );
  // Refs
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // delete tag when user click close button
  const closeTag = (index) => {
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

  const mapped = tags.map((tag, i) => (
    <Tag key={tag} text={tag} onClose={() =>  closeTag(i)} {...{ readOnly }} />
  ));

  return (
    <label className={`${className.label} ${theme}`} htmlFor={props.name}>
      <div
        className={className.container}
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
        {mapped}
        <input
          onKeyPress={addTag}
          className={className.input}
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

export default InputTag;
