import React from "react";
// Icons
import { IoMdClose as CloseIcon } from "react-icons/io";

interface Props {
  text: string;
  onClose: () => void;
  readOnly: boolean;
}

function Tag({ text, onClose, readOnly }: Props) {
  return (
    <span className="flex items-center bg-primary text-prim-text px-2 py-1 rounded-sm text-sm mr-1 mb-2">
      {text}
      {/* close tag */}
      {!readOnly && (
        <CloseIcon onClick={onClose} className="w-4 h-4 ml-2 cursor-pointer" />
      )}
    </span>
  );
}

export default Tag;
