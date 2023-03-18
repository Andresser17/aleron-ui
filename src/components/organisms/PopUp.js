import React, { useState } from "react";
import PropTypes from "prop-types";
// Components
import PopUpModal from "components/modals/PopUpModal";
import Button from "components/form/Button";
// Helpers
import key from "helpers/key";
// Icons
import { ReactComponent as CheckIcon } from "icons/success-icon.svg";
import { ReactComponent as ErrorIcon } from "icons/error-icon.svg";
import { ReactComponent as InfoIcon } from "icons/info-icon.svg";

function PopUp({
  palette = "primary",
  title,
  description,
  mode = "success",
  countdown = 0,
  buttons,
}) {
  const [close, setClose] = useState(false);
  const clickButton = (cb) => {
    cb !== undefined && cb();
    // close modal
    setClose(true);
  };

  const mappedButtons =
    buttons &&
    buttons.map((b, i) => {
      if (buttons.length > 1 && i === buttons.length - 1)
        return (
          <button
            onClick={() => clickButton(b.click)}
            key={key(b.text)}
            className="al-mx-1 al-text-bg al-h-fit"
          >
            {b.text}
          </button>
        );

      return (
        <span
          onClick={() => clickButton(b.click)}
          key={key(b.text)}
          className="al-mx-1 al-block"
        >
          <Button text={b.text} palette={palette} />
        </span>
      );
    });

  return (
    <PopUpModal countdown={countdown} close={close} palette={palette}>
      <div className={`al-flex al-flex-col al-items-center ${palette}`}>
        {mode === "error" && (
          <>
            <span className="al-bg-red-600/25 al-block al-w-14 al-h-14 al-p-3 al-rounded-[50%]">
              <ErrorIcon className="al-text-bg danger" />
            </span>

            <span className="al-mt-4 al-text-lg al-font-semibold">{title}</span>

            <p className="al-text-[0.8rem]">{description}</p>

            <div className="al-mt-4 al-text-sm al-flex al-items-center">
              {mappedButtons}
            </div>
          </>
        )}

        {mode === "info" && (
          <>
            <span className="al-bg-yellow-200/25 al-block al-w-14 al-h-14 al-p-3 al-rounded-[50%]">
              <InfoIcon className="al-text-bg warning" />
            </span>

            <span className="al-mt-4 al-text-lg al-font-semibold">{title}</span>

            <p className="al-text-[0.8rem]">{description}</p>

            <div className="al-mt-4 al-text-sm al-flex al-items-center">
              {mappedButtons}
            </div>
          </>
        )}

        {mode === "success" && (
          <>
            <span className="al-bg-green-600/25 al-block al-w-14 al-h-14 al-p-3 al-rounded-[50%]">
              <CheckIcon className="al-text-bg success" />
            </span>

            <span className="al-mt-4 al-text-lg al-font-semibold">{title}</span>

            <p className="al-text-[0.8rem]">{description}</p>

            <div className="al-mt-4 al-text-sm">{mappedButtons}</div>
          </>
        )}
      </div>
    </PopUpModal>
  );
}
PopUp.propTypes = {
  palette: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  mode: PropTypes.string,
  countdown: PropTypes.number,
  buttons: PropTypes.array,
};

export default PopUp;
