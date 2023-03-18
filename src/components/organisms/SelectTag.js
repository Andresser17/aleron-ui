import React, { useState, useEffect, useRef } from "react";
import useStyles from "hooks/useStyles";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";
import { ReactComponent as CheckmarkIcon } from "icons/success-icon.svg";

function Option({ styles, option, isSelected, setSelected }) {
  const className = useStyles(
    {
      option: {
        hover: "hover:bg-card/90",
        focus: "focus:bg-card/70",
        padding: "p-4",
        main: "flex justify-between cursor-pointer text-left",
      },
    },
    styles
  );

  return (
    <span
      className={className.option}
      onClick={() => !isSelected && setSelected(option)}
    >
      {option.label}
      {isSelected && <CheckmarkIcon className="w-4 h-4" />}
    </span>
  );
}

function Dropdown({
  styles,
  search = false,
  inputValue = "",
  options,
  selectedTags,
  setSelected,
}) {
  const className = useStyles(
    {
      dropdown: {
        dimen: "w-full",
        position: "absolute top-[110%] left-0 z-10",
        rounded: "rounded-sm",
        main: "bg-card text-text shadow-lg",
      },
    },
    styles
  );

  return (
    <div className={className.dropdown}>
      {options
        .filter((op) => {
          const filter = inputValue.toUpperCase();
          if (search) {
            if (op.label.toUpperCase().indexOf(filter) > -1) {
              return op;
            }

            return undefined;
          }

          return op;
        })
        .map((op) => {
          const isSelected = selectedTags.includes(op);

          return (
            <Option
              styles={styles}
              key={op.value}
              option={op}
              isSelected={isSelected}
              setSelected={setSelected}
            />
          );
        })}
    </div>
  );
}

function Tag({ styles, text, close, readOnly }) {
  const className = useStyles(
    {
      tag: {
        padding: "px-2",
        margin: "mb-1 mr-1",
        rounded: "rounded-sm",
        main: "flex bg-primary text-prim-text text-sm",
      },
    },
    styles
  );

  return (
    <span className={className.tag}>
      {text}
      {/* close tag */}
      {!readOnly && (
        <DeleteIcon onClick={close} className="ml-1 cursor-pointer w-4" />
      )}
    </span>
  );
}

function Tags({ styles, tags, deleteTag, readOnly }) {
  const mapped =
    tags.length > 0 &&
    tags.map((tag, i) => (
      <Tag
        styles={styles}
        key={tag.value}
        text={tag.label}
        close={(event) => deleteTag(event, i)}
        {...{ readOnly }}
      />
    ));

  return mapped;
}

function SelectTag({
  theme = "primary",
  styles = {},
  options = [],
  maxTags = 5,
  placeholder = "Search",
  setValue = (name, value) => undefined,
  disabled,
  ...props
}) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const [tags, setTags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const className = useStyles(
    {
      container: {
        dimen: "w-64",
        main: "bg-card text-text relative z-10 rounded-sm",
      },
      inputContainer: {
        focus: isFocus ? "outline outline-1" : "",
        disabled: disabled ? "pointer-events-none" : "",
        padding: "p-4",
        main: "flex cursor-text shadow-md",
      },
      input: {
        dimen: "w-full",
        focus: "focus:outline-none",
        border: "border-none",
        main: "text-text flex-auto bg-black/0",
      },
    },
    styles,
    { isFocus, disabled }
  );
  // Refs
  const containerRef = useRef();
  const outsideSpanRef = useRef();
  const inputRef = useRef();

  // delete input and selected value
  const deleteValue = (e) => {
    e.stopPropagation();
    setValue("");
    setTags([]);
  };

  const handleTagClose = (e, index) => {
    e.stopPropagation();
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    // Delete tag in parent state
    // getTags([...newTags], mergeData);
  };

  const handleSelection = (option) => {
    if (isSearching) setIsSearching(false);
    if (tags.length >= maxTags) return;

    setShowDropdown(false);
    setTags((prev) => [...prev, option]);
    setValue(props.name, "");
  };

  return (
    <>
      <div className={`${className.container} ${theme}`}>
        <div
          aria-disabled={disabled}
          ref={containerRef}
          onClick={() => {
            if (disabled) return;
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={className.inputContainer}
        >
          <div className="flex flex-wrap w-full">
            <Tags tags={tags} deleteTag={handleTagClose} />
            <input
              autoComplete="off"
              ref={inputRef}
              type="search"
              className={className.input}
              {...{
                disabled,
                placeholder,
                ...{
                  ...field,
                  ref(e) {
                    field.ref(e);
                    inputRef.current = e;
                  },
                },
                onChange: (e) => {
                  if (!isSearching) setIsSearching(true);
                  field.onChange(e);
                },
                value: field.value ? field.value : "",
              }}
            />
          </div>
          <DeleteIcon
            onClick={deleteValue}
            className={`w-[1rem] h-[1rem] min-w-[1rem] min-h-[1rem] ml-2 text-zinc-400 hover:text-text cursor-pointer ${
              field.value || tags.length > 0 ? "visible" : "invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow className="w-[1rem] h-[1rem] min-w-[1rem] min-h-[1rem] ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          ) : (
            <BottomArrow className="w-[1rem] h-[1rem] min-w-[1rem] min-h-[1rem] ml-2 text-zinc-400 hover:text-text cursor-pointer" />
          )}
        </div>
        {showDropdown && (
          <Dropdown
            styles={styles}
            search={isSearching}
            inputValue={field.value}
            options={options}
            selectedTags={tags}
            setSelected={handleSelection}
          />
        )}
      </div>
      {/* Handle outside click */}
      {isFocus && (
        <span
          onClick={() => {
            setShowDropdown(false);
            setIsFocus(false);
          }}
          ref={outsideSpanRef}
          className="fixed block top-0 left-0 w-full h-full bg-black/0"
        ></span>
      )}
    </>
  );
}
SelectTag.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.array,
  maxTags: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.object,
  required: PropTypes.bool,
  setValue: PropTypes.func,
  name: PropTypes.string,
};

export default SelectTag;
