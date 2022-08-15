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
  const optBorder = border ? "al-border-2" : "";
  const styles = `al-bg-bg al-text-text ${optBorder} focus:al-border-[0.125rem] al-border-border hover:al-bg-hover active:al-bg-active focus:al-bg-focus focus:al-border-focus-border disabled:al-bg-bg disabled:al-opacity-[var(--disabled-opacity)] ${optPadding} ${palette}`;

  // Default icons
  const loadingIcon = (
    <span className={`al-inline-block al-w-6 al-h-6`}>
      <LoadingIcon className="al-animate-spin" />
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
  onClick: PropTypes.func,
  text: PropTypes.string,
  palette: PropTypes.string,
  icon: PropTypes.bool,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.element,
};

export default Button;
