import React from "react";
import { useController } from "react-hook-form";
// Hooks
import useStyles from "@/hooks/useStyles";

interface Props {
  theme: string,
  styles: any,
  name: string,
  description: string,
  placeholder: string,
  defaultValue: string,
  disabled: boolean,
  readOnly: boolean,
  type: string,
  rules: any,
};

function Textarea({
  theme = "primary",
  styles = {},
  description = "",
  placeholder,
  disabled,
  readOnly,
  ...props
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const className = useStyles(
    {
      label: {
        dimen: "w-64 h-36",
        main: "flex flex-col items-start relative text-sm",
      },
      input: {
        dimen: "w-full h-full",
        hover: "hover:shadow-lg",
        focus:
          "focus:outline focus:outline-1 focus:outline-border focus:shadow-lg",
        disabled: "disabled:opacity-90 disabled:shadow-md",
        placeholder: "placeholder:text-black/0",
        error: error?.message.length > 0 ? "bg-red-400" : "bg-card",
        border: "border-none",
        rounded: "rounded-sm",
        padding: "p-4",
        main: "text-text shadow-md",
      },
      placeholder: {
        notEmpty: field.value ? "text-[0.6rem] top-[0.125rem]" : "top-[16px]",
        main: "text-gray-400 absolute pointer-events-none duration-500 left-4",
      },
      description: {
        error: error?.message
          ? "text-bg danger"
          : "text-text primary dark:dark",
        margin: "my-1",
        main: "text-xs",
      },
    },
    styles,
    { value: field.value, error }
  );

  return (
    <label className={`${className.label} ${theme}`} htmlFor={props.name}>
      <textarea
        className={className.input}
        {...{
          disabled,
          readOnly,
          placeholder,
          ...field,
          value: field.value || "",
        }}
      />
      {/* Placeholder */}
      <span className={className.placeholder}>{placeholder}</span>
      {/* Description */}
      <span className={className.description}>
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : description}
      </span>
    </label>
  );
}

export default Textarea;
