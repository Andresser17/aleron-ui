import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as TopArrow } from "icons/top-arrow.svg";
import { ReactComponent as BottomArrow } from "icons/bottom-arrow.svg";
import { ReactComponent as DeleteIcon } from "icons/error-icon.svg";
import { ReactComponent as CheckmarkIcon } from "icons/success-icon.svg";

function Option({ option, isSelected, setSelected }) {
  return (
    <span
      className="flex justify-between w-full p-4 cursor-pointer text-left block hover:bg-hover focus:bg-focus"
      onClick={() => !isSelected && setSelected(option)}
    >
      {option.label}
      {isSelected && <CheckmarkIcon className="w-4 h-4" />}
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
    <div className="w-full shadow-lg rounded-sm absolute top-[110%] left-0 bg-bg text-text z-10">
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
      className={`flex bg-bg text-text px-2 rounded-sm text-sm mb-1 mr-1 ${palette}`}
    >
      {text}
      {/* close tag */}
      {!readOnly && (
        <DeleteIcon onClick={close} className="ml-1 cursor-pointer w-4" />
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
  disabled,
  defaultValue,
  required,
  name,
}) {
  const [value, setValue] = useState("");
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

  // set default value
  useEffect(() => {
    if (defaultValue && defaultValue.label.length > 0) {
      setTags(defaultValue);
    }
  }, [defaultValue]);

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
    setValue("");
  };

  const handleChange = (e) => {
    if (!isSearching) setIsSearching(true);
    setValue(e.target.value);
  };

  return (
    <>
      <div className={`bg-bg text-text relative z-10 ${palette}`}>
        <div
          aria-disabled={disabled}
          ref={containerRef}
          onClick={() => {
            if (disabled) return;
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={`flex cursor-text p-4 w-full shadow-md rounded-sm ${
            isFocus ? "outline outline-1" : ""
          } ${disabled ? "pointer-events-none" : ""}`}
        >
          <div className="flex flex-wrap w-full">
            <Tags
              tagsPalette={tagsPalette}
              tags={tags}
              deleteTag={handleTagClose}
            />
            <input
              ref={inputRef}
              value={value}
              onChange={handleChange}
              type="search"
              className="w-auto flex flex-auto bg-black/0 focus:outline-none"
              {...{
                disabled,
                required,
                placeholder,
                name,
              }}
            />
          </div>
          <DeleteIcon
            onClick={deleteValue}
            className={`w-6 h-6 ml-2 text-zinc-400 hover:text-text cursor-pointer ${
              value || tags.length > 0 ? "visible" : "invisible"
            }`}
          />
          {showDropdown ? (
            <TopArrow
              className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
            />
          ) : (
            <BottomArrow
              className={`w-6 h-6 ml-2 text-black/30 hover:text-text cursor-pointer`}
            />
          )}
        </div>
        {showDropdown && (
          <Dropdown
            search={isSearching}
            inputValue={value}
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
  palette: PropTypes.string,
  tagsPalette: PropTypes.string,
  options: PropTypes.array,
  maxTags: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.object,
  required: PropTypes.bool,
  name: PropTypes.string,
};

export default SelectTag;
