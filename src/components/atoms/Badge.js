import React from "react";
import PropTypes from "prop-types";

function Badge({ palette, text, rounded, border }) {
  // If rounded is not provided, is equal
  const optRounded = rounded ? "al-rounded-3xl" : "al-rounded-sm";
  // If border is active
  const optBorder = border
    ? "al-border-solid al-border-border al-border"
    : "";

  return (
    <span
      className={`al-bg-bg al-text-text al-px-4 al-py-[0.08rem] ${optRounded} ${optBorder} al-shadow-md ${palette}`}
    >
      {text}
    </span>
  );
}
Badge.propTypes = {
  palette: PropTypes.string,
  text: PropTypes.string,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
};

export default Badge;
