import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Tooltip({ text, palette = "primary", position = "right", children }) {
  // Ref
  const spanRef = useRef();
  // Styles
  const arrowStyle =
    "after:al-absolute after:al-border-[5px] after:al-border-black/0";
  const rightStyle =
    "al-top-0 al-bottom-0 al-left-[110%] al-m-auto after:al-top-[50%] after:al-right-full after:-al-mt-[5px] after:al-border-r-bg";
  const leftStyle =
    "al-top-0 al-bottom-0 al-right-[110%] al-m-auto after:al-top-[50%] after:al-left-full after:-al-mt-[5px] after:al-border-l-bg";
  const topStyle =
    "al-bottom-[120%] al-left-0 al-right-0 after:al-top-full after:al-left-[50%] after:al-border-t-bg";
  const bottomStyle =
    "al-top-[120%] al-left-0 al-right-0 after:al-bottom-full after:al-left-[50%] after:al-border-b-bg";
  const styles = `al-px-4 al-py-1 al-w-32 al-h-8 al-rounded-sm al-bg-bg al-text-text al-absolute al-inline-block al-z-10 al-text-center al-shadow-md ${arrowStyle} ${palette}`;

  useEffect(() => {
    if (position === "right")
      spanRef.current.className = `${styles} ${rightStyle}`;
    if (position === "left")
      spanRef.current.className = `${styles} ${leftStyle}`;
    if (position === "top") spanRef.current.className = `${styles} ${topStyle}`;
    if (position === "bottom")
      spanRef.current.className = `${styles} ${bottomStyle}`;
  }, [position, styles]);

  return (
    <div className="al-inline-block al-bg-red-600 al-relative">
      {children}
      <span ref={spanRef}>{text}</span>
    </div>
  );
}
Tooltip.propTypes = {
  text: PropTypes.string,
  direction: PropTypes.string,
  palette: PropTypes.string,
};

export default Tooltip;
