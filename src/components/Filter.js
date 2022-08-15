import React, { useState } from "react";
import PropTypes from "prop-types";

function Filter({ palette = "primary", onClick, items = [] }) {
  const [active, setActive] = useState(0);
  // If item is active
  const activeBorder = "al-border-bg hover:al-border-hover";
  const defaultBorder = "al-border-gray-300/60 hover:al-border-gray-500";
  const styles = `al-flex al-justify-center al-items-center al-block al-w-20 al-h-12 al-text-text al-border-2 al-cursor-pointer ${palette}`;

  const handleClick = (e, index) => {
    setActive(index);

    const text = e.target.textContent.toLowerCase();
    onClick(text);
  };

  return (
    <div className="al-flex">
      {items.length > 0 && items.map((item, i) => (
        <span
          onClick={(e) => handleClick(e, i)}
          key={`${item.toLowerCase()}-${i}`}
          className={`${
            active === i ? activeBorder : defaultBorder
          } ${i === 0 ? "al-rounded-l-md" : ""} ${
            i === items.length - 1 ? "al-rounded-r-md" : ""
          } ${styles} `}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
Filter.propTypes = {
  palette: PropTypes.string,
  onClick: PropTypes.func,
  items: PropTypes.array,
};

export default Filter;
