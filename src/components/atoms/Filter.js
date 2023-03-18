import React, { useState } from "react";
import PropTypes from "prop-types";

function Filter({
  palette = "primary",
  options = [],
  onClick = (value) => undefined,
}) {
  const [active, setActive] = useState(0);
  // If item is active
  const activeBorder = "al-border-bg hover:al-border-hover";
  const defaultBorder = "al-border-black/30 hover:al-border-black/40";
  const spanStyles = `al-flex al-justify-center al-items-center al-block al-w-20 al-h-12 al-text-text al-border-solid al-border-2 al-cursor-pointer`;

  const handleClick = (e, index) => {
    setActive(index);
    const value = e.target.textContent.toLowerCase();
    onClick(value);
  };

  return (
    <div className={`al-flex ${palette}`}>
      {options.length > 0 &&
        options.map((op, i) => {
          const isActive = active === i ? activeBorder : defaultBorder;
          const dinamicRadius =
            i === 0
              ? "al-rounded-l"
              : i === options.length - 1
              ? "al-rounded-r"
              : "";

          return (
            <span
              onClick={(e) => handleClick(e, i)}
              key={op}
              className={`${isActive} ${dinamicRadius} ${spanStyles} `}
            >
              {op}
            </span>
          );
        })}
    </div>
  );
}
Filter.propTypes = {
  palette: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
};

export default Filter;
