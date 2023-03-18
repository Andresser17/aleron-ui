import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as CloseIcon } from "icons/error-icon.svg";

function PopUpModal({ palette = "primary", countdown = 0, close, children }) {
  // refs
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.style.display = "none";
  };

  // close modal after countdown time is over
  useEffect(() => {
    if (countdown > 0) setTimeout(closeModal, 1000 * countdown);
  }, [countdown]);

  // close modal if close is true
  useEffect(() => {
    if (close) closeModal();
  }, [close]);

  return (
    <div
      ref={modalRef}
      className={`al-relative al-bg-gray-100 al-text-gray-800 al-px-2 al-py-4 al-min-w-[20rem] al-min-h-[4rem] al-rounded ${palette}`}
    >
      <button
        onClick={closeModal}
        className="al-w-6 al-block al-absolute al-top-1 al-right-1 al-rounded al-bg-bg al-text-text al-p-1"
      >
        <CloseIcon className="al-w-full" />
      </button>
      {/* children */}
      {children}
    </div>
  );
}
PopUpModal.propTypes = {
  palette: PropTypes.string,
  countdown: PropTypes.number,
  close: PropTypes.bool,
};

export default PopUpModal;
