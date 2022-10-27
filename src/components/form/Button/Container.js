import React from "react";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

function Container({
  onClick,
  disabled,
  loading,
  className,
  rounded,
  children,
}) {
  return (
    <button
      {...{ onClick, disabled: disabled ? disabled : loading, className }}
    >
      {loading && (
        <div
          className={`absolute top-0 left-0 flex items-center justify-center bg-primary w-full h-full ${rounded}`}
        >
          <LoadingIcon className="text-lg block w-5 h-5 animate-spin" />
        </div>
      )}
      {children}
    </button>
  );
}

export default Container;
