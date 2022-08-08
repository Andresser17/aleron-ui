import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Tooltip({ text, palette = "primary", position = "right", children }) {
  // Ref
  const spanRef = useRef();
  // Styles
  const arrowStyle = "after:absolute after:border-[5px] after:border-black/0";
  const rightStyle =
    "top-0 bottom-0 left-[110%] m-auto after:top-[50%] after:right-full after:-mt-[5px] after:border-r-bg";
  const leftStyle =
    "top-0 bottom-0 right-[110%] m-auto after:top-[50%] after:left-full after:-mt-[5px] after:border-l-bg";
  const topStyle =
    "bottom-[120%] left-0 right-0 after:top-full after:left-[50%] after:border-t-bg";
  const bottomStyle =
    "top-[120%] left-0 right-0 after:bottom-full after:left-[50%] after:border-b-bg";
  const styles = `px-4 py-1 w-32 h-8 rounded-sm bg-bg text-text absolute inline-block z-10 text-center shadow-md ${arrowStyle} ${palette}`;

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
    <div className="inline-block bg-red-600 relative">
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
