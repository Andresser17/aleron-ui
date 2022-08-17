import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as LoadingIcon } from "icons/loading-icon.svg";
import { ReactComponent as PlusIcon } from "icons/plus-icon.svg";

function IconCircle({ children, disabled, styles, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`al-w-10 al-h-10 al-flex al-justify-center al-items-center al-rounded-[50%] ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Icon({ children, rounded, disabled, styles, onClick }) {
  const optRounded = rounded ? "al-rounded-lg" : "al-rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`al-px-2 al-h-9 al-flex al-items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function LabelIcon({ children, rounded, disabled, styles, onClick }) {
  const optRounded = rounded ? "al-rounded-lg" : "al-rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`al-flex al-items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Label({ rounded, disabled, styles, children, onClick }) {
  const optRounded = rounded ? "al-rounded-lg" : "al-rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`al-flex al-items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Button({
  text,
  palette = "primary",
  loading,
  border,
  icon,
  children,
  ...restProps
}) {
  // If icon is true and text is empty
  const optPadding = !text && icon ? "" : "al-px-4 al-py-2";
  // If border is active
  const optBorder = border
    ? "al-border-solid al-border al-border-border"
    : "al-border-none";
  const focusStyle =
    "focus:al-outline focus:al-outline-1 focus:al-bg-focus focus:al-outline-outline";
  const disabledStyle =
    "disabled:al-bg-bg disabled:al-opacity-[var(--disabled-opacity)]";
  const styles = `al-cursor-pointer al-bg-bg al-text-text hover:al-bg-hover active:al-bg-active ${optBorder} ${optPadding} ${disabledStyle} ${focusStyle} ${palette}`;

  // Default icons
  const loadingIcon = (
    <span className={`al-inline-block al-w-6 al-h-6`}>
      <LoadingIcon />
    </span>
  );
  // If user provide a new icon like children replace customIcon
  const customIcon = (
    <span className={`${text && "al-mr-2"} al-block al-w-6 al-h-6`}>
      {children ? (
        children
      ) : (
        <PlusIcon className="al-align-middle al-w-6 al-h-6" />
      )}
    </span>
  );

  // Icon Inside Perfect circle
  if (icon && restProps.rounded && !text)
    return (
      <IconCircle styles={styles} {...restProps}>
        {loading ? loadingIcon : customIcon}
      </IconCircle>
    );

  // Square Icon without text
  if (icon && !text)
    return (
      <Icon styles={styles} {...restProps}>
        {loading ? loadingIcon : customIcon}
      </Icon>
    );

  // Label with Icon
  if (icon && text)
    return (
      <LabelIcon styles={styles} {...restProps}>
        {loading ? (
          loadingIcon
        ) : (
          <>
            {customIcon}
            {text}
          </>
        )}
      </LabelIcon>
    );

  return (
    <Label styles={styles} {...restProps}>
      {loading ? loadingIcon : text}
    </Label>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  palette: PropTypes.string,
  icon: PropTypes.bool,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Button;
