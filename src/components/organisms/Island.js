import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as DefaultIcon } from "icons/division-icon.svg";
import { ReactComponent as ParamIcon1 } from "icons/graduation-hat-icon.svg";
import { ReactComponent as ParamIcon2 } from "icons/pencil-icon.svg";

function Island({
  palette = "primary",
  title,
  head,
  description,
  children,
  mode = "stop",
  percent = 0,
}) {
  const optPadding = mode === "stop" ? "al-p-5" : "al-p-5 al-pt-10";
  // refs
  const progressBarRef = useRef();

  // progress bar width
  useEffect(() => {
    const progressBar = () => {
      progressBarRef.current.style.width = `${percent}%`;
    };
    progressBar();
  }, [percent]);

  return (
    <div
      className={`al-relative al-bg-bg al-text-text al-w-96 ${optPadding} al-rounded-md al-flex al-items-start al-flex-col ${palette}`}
    >
      <div className="al-w-28 al-h-28 al-rounded-bl-[100%] al-bg-white/20 al-top-0 al-flex al-place-content-center al-right-0 al-absolute">
        {children?.icon ? (
          children.icon
        ) : (
          <DefaultIcon className="al-w-8 al-text-text al-ml-6 al-mb-4" />
        )}
      </div>
      {/* Progress bar */}
      {mode !== "stop" && (
        <span
          ref={progressBarRef}
          className={`al-absolute al-top-0 al-left-0 al-block al-w-full al-px-5 al-py-1 al-text-[0.8rem] al-text-left al-rounded-tl-md ${
            percent >= 99 ? "al-rounded-tr-md" : ""
          } al-bg-bg success`}
        >
          {mode === "completed"
            ? "Completed"
            : percent <= 33
            ? `${percent}%`
            : `Progress ${percent}%`}
        </span>
      )}
      {/* Title */}
      <span className="al-text-sm al-text-bg al-bg-text al-px-2 al-py-0.5 al-mb-2 al-font-semibold al-rounded-xl">
        {title}
      </span>
      {/* Head */}
      <span className="al-text-2xl al-block al-text-left">{head}</span>
      {/* Description */}
      <p className="al-text-md al-mt-1">{description}</p>
      {/* Buttons and params */}
      <div className="al-mt-5 al-flex">
        <button className="al-border-2 al-rounded al-mr-6 al-py-2 al-px-4 al-border-text hover:al-bg-white/10">
          Open
        </button>
        {children?.params ? (
          children.params.map((p) => (
            <span className="al-mr-2 al-flex al-items-center">
              {p.icon} {p.text}
            </span>
          ))
        ) : (
          <>
            <span className="al-mr-3 al-flex al-items-center">
              <ParamIcon1 className="al-w-6 al-mr-1 al-text-text" /> Params
            </span>
            <span className="al-mr-3 al-flex al-items-center">
              <ParamIcon2 className="al-w-5 al-mr-1 al-text-text" /> Params
            </span>
          </>
        )}
      </div>
    </div>
  );
}
Island.propTypes = {
  palette: PropTypes.string,
  title: PropTypes.string,
  head: PropTypes.string,
  description: PropTypes.string,
  mode: PropTypes.string,
  percent: PropTypes.number,
};

export default Island;
