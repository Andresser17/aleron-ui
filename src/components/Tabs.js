import React, { useState } from "react";
import PropTypes from "prop-types";
// Helpers
import formatKey from "helpers/key";

function Tab({ text, size, id, horizontal, selected, onSelected }) {
  const font =
    size === "sm" ? "al-text-sm" : size === "md" ? "al-text-md" : "al-text-lg";

  return (
    <span
      onClick={onSelected}
      className={`al-inline-block al-text-zinc-500 hover:al-border-zinc-500 al-cursor-pointer ${
        selected === id ? "al-border-bg" : "al-border-black/0"
      } ${font} ${
        horizontal ? "al-border-l-2 al-pl-5 al-py-2" : "al-border-b-2 al-px-4 al-py-3"
      }`}
    >
      {text}
    </span>
  );
}

function Tabs({
  palette = "primary",
  tabs,
  size = "sm",
  horizontal,
  getSelected,
}) {
  const [selected, setSelected] = useState("");

  // if one tab is clicked, update selected
  const handleSelected = (key) => {
    setSelected(key);
    // pass selected tab to parent
    getSelected(key);
  };

  return (
    <div className={`${horizontal ? "al-flex al-flex-col" : ""} ${palette}`}>
      {tabs &&
        tabs.map((t, i) => {
          const key = formatKey(t);

          // select the first tab by default
          if (i === 0 && selected.length === 0) setSelected(key);

          return (
            <Tab
              key={key}
              id={key}
              size={size}
              text={t}
              selected={selected}
              onSelected={() => handleSelected(key)}
              horizontal={horizontal}
            />
          );
        })}
    </div>
  );
}
Tabs.propTypes = {
  palette: PropTypes.string,
  tabs: PropTypes.array,
  size: PropTypes.string,
  horizontal: PropTypes.bool,
  getSelected: PropTypes.func,
};

export default Tabs;
