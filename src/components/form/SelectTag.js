import React, { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";
import { ReactComponent as CheckmarkIcon } from "icons/success-icon.svg";

function Option({ option, isSelected, setSelected }) {
  return (
    <span
      className="al-flex al-justify-between al-p-4 al-cursor-pointer al-text-left al-block hover:al-bg-hover focus:al-bg-focus"
      onClick={() => !isSelected && setSelected(option)}
    >
      {option.label}
      {isSelected && <CheckmarkIcon className="al-w-4 al-h-4" />}
    </span>
  );
}

function Dropdown({
  search = false,
  inputValue = "",
  options,
  selectedTags,
  setSelected,
}) {
  return (
    <div className="al-w-full al-shadow-lg al-rounded-sm al-absolute al-top-[110%] al-left-0 al-bg-bg al-text-text al-z-10">
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

function Tag({ palette, text, close, readOnly }) {
  return (
    <span
      className={`al-flex al-bg-bg al-text-text al-px-2 al-rounded-sm al-text-sm al-mb-1 al-mr-1 ${palette}`}
    >
      {text}
      {/* close tag */}
      {!readOnly && (
        <DeleteIcon
          onClick={close}
          className="al-ml-1 al-cursor-pointer al-w-4"
        />
      )}
    </span>
  );
}

function Tags({ tagsPalette, tags, deleteTag, readOnly }) {
  const mapped =
    tags.length > 0 &&
    tags.map((tag, i) => (
      <Tag
        palette={tagsPalette}
        key={tag.value}
        text={tag.label}
        close={(event) => deleteTag(event, i)}
        {...{ readOnly }}
      />
    ));

  return mapped;
}

function SelectTag({
  palette = "light",
  tagsPalette = "primary",
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
      <div
        className={`al-bg-bg al-text-text al-relative al-z-10 al-rounded-sm ${palette}`}
      >
        <div
          aria-disabled={disabled}
          ref={containerRef}
          onClick={() => {
            if (disabled) return;
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={`al-flex al-cursor-text al-p-4 al-shadow-md ${
            isFocus ? "al-outline al-outline-1" : ""
          } ${disabled ? "al-pointer-events-none" : ""}`}
        >
          <div className="al-flex al-flex-wrap">
            <Tags
              tagsPalette={tagsPalette}
              tags={tags}
              deleteTag={handleTagClose}
            />
            <input
              ref={inputRef}
              type="search"
              className="al-w-full al-text-text al-flex-auto al-bg-black/0 al-border-none focus:al-outline-none"
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
            className={`al-w-[1rem] al-h-[1rem] al-min-w-[1rem] al-min-h-[1rem] al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer ${
              field.value || tags.length > 0 ? "al-visible" : "al-invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow
              className={`al-w-[1rem] al-h-[1rem] al-min-w-[1rem] al-min-h-[1rem] al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer`}
            />
          ) : (
            <BottomArrow
              className={`al-w-[1rem] al-h-[1rem] al-min-w-[1rem] al-min-h-[1rem] al-ml-2 al-text-zinc-400 hover:al-text-text al-cursor-pointer`}
            />
          )}
        </div>
        {showDropdown && (
          <Dropdown
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
          className="al-fixed al-block al-top-0 al-left-0 al-w-full al-h-full al-bg-black/0"
        ></span>
      )}
    </>
  );
}
SelectTag.propTypes = {
  palette: PropTypes.string,
  tagsPalette: PropTypes.string,
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
