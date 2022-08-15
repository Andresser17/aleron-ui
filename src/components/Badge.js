import React from "react";
import PropTypes from "prop-types";

function Badge({ text, palette, rounded, border }) {
  // If aleron-rounded is not provided, is equal
  const optRounded = rounded ? "al-rounded-3xl" : "al-rounded-sm";
  // If aleron-border is active
  const optBorder = border ? "al-border-2" : "";

  return (
    <span
      className={`al-bg-bg al-text-text ${optBorder} al-px-4 py-[0.08rem] ${optRounded} al-border-border al-shadow-md ${palette}`}
    >
      {text}
    </span>
  );
}
Badge.propTypes = {
  text: PropTypes.string,
  palette: PropTypes.string,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
};

export default Badge;
