import React, { useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as InfoIcon } from "icons/info-icon.svg";
import { ReactComponent as ErrorIcon } from "icons/error-icon.svg";
import { ReactComponent as SuccessIcon } from "icons/success-icon.svg";

const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }

  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }

  return "desktop";
};

function Notification({
  palette = "primary",
  header,
  buttons,
  description,
  mode,
  onClose,
  onHelp,
}) {
  const styles = `al-flex al-items-start al-flex-col al-relative al-bg-gray-100 al-p-4 al-w-72 al-rounded-sm al-shadow-md ${palette}`;

  useEffect(() => {
    setTimeout(onClose, 1000 * 5);
  }, [onClose]);

  return (
    <div className={styles}>
      {mode === "success" && (
        <SuccessIcon
          role="success-icon"
          className="al-w-8 al-h-8 al-top-[10%] al-right-[5%] al-absolute al-block al-text-bg success"
        />
      )}
      {mode === "error" && (
        <ErrorIcon
          role="error-icon"
          className="al-w-8 al-h-8 al-top-[10%] al-right-[5%] al-absolute al-block al-text-bg danger"
        />
      )}
      {mode === "info" && (
        <InfoIcon
          role="info-icon"
          className="al-w-8 al-h-8 al-top-[10%] al-right-[5%] al-absolute al-opacity-100 al-block al-text-bg"
        />
      )}
      {header?.length > 0 && <span className="al-font-bold">{header}</span>}
      {description?.length > 0 && (
        <p
          className={`${buttons ? "al-mb-4" : ""} ${
            header?.length > 0 ? "al-mt-2" : ""
          }`}
        >
          {description}
        </p>
      )}
      {buttons && deviceType() !== "mobile" && (
        <div
          className={`${mode === "success" ? "success" : ""} ${
            mode === "error" ? "danger" : ""
          }`}
        >
          <button
            onClick={onClose}
            className="al-rounded-sm al-px-4 al-py-2 al-text-bg al-border-2 al-border-bg hover:al-border-hover hover:al-text-hover active:al-border-active active:al-text-active focus:al-border-focus focus:al-text-focus"
          >
            Close
          </button>
          <button
            onClick={onHelp}
            className="al-ml-6 al-text-bg hover:al-border-hover hover:al-text-hover active:al-text-active focus:al-text-focus"
          >
            Help
          </button>
        </div>
      )}
    </div>
  );
}
Notification.propTypes = {
  palette: PropTypes.string,
  header: PropTypes.string,
  buttons: PropTypes.bool,
  description: PropTypes.string,
  mode: PropTypes.string,
  onClose: PropTypes.func,
  onHelp: PropTypes.func,
};

export default Notification;
