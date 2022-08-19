import React, { useState } from "react";
import PropTypes from "prop-types";

function Tab({ tab, size, vertical, selected, onSelected }) {
  const hoverStyle = `al-border-solid ${
    selected === tab.value
      ? "al-border-bg hover:al-border-bg"
      : "al-border-black/0 hover:al-border-zinc-500"
  }`;
  const verticalStyle = vertical
    ? "al-border-l-2 al-pl-5 al-py-2"
    : "al-border-b-2 al-px-4 al-py-3";
  const fontStyle =
    size === "sm" ? "al-text-sm" : size === "md" ? "al-text-md" : "al-text-lg";

  return (
    <span
      onClick={() => onSelected(tab.value)}
      className={`al-inline-block al-text-text al-cursor-pointer al-border-0 ${fontStyle} ${hoverStyle} ${verticalStyle}`}
    >
      {tab.label}
    </span>
  );
}

function Tabs({
  palette = "primary",
  tabs = [],
  size = "sm",
  vertical,
  onClick = (value) => undefined,
}) {
  const [selected, setSelected] = useState("");

  // if one tab is clicked, update selected
  const handleSelected = (tab) => {
    setSelected(tab);
    // pass selected tab to parent
    onClick(tab);
  };

  return (
    <div className={`${vertical ? "al-flex al-flex-col" : ""} ${palette}`}>
      {tabs &&
        tabs.map((tab, i) => {
          if (selected.length === 0 && tab.selected) setSelected(tab.value);

          return (
            <Tab
              key={tab.value}
              onSelected={handleSelected}
              {...{ tab, vertical, selected, size, selected }}
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
  vertical: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Tabs;
