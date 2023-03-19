import React from "react";
// Icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

interface Props {
  theme: string;
  className: string;
  loading: boolean;
  disabled: boolean;
  rounded: string;
  onClick: () => void;
  children: React.Node;
}

function Container({
  theme,
  className,
  loading,
  disabled,
  rounded,
  onClick,
  children,
}: Props) {
  return (
    <button
      className={`${className} ${theme}`}
      {...{ onClick, disabled: disabled ? disabled : loading }}
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
