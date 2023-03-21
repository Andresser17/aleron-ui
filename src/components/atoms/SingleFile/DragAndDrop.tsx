import React from "react";
// Hooks
import useStyles from "@/hooks/useStyles";
// Icons
import { AiFillFileAdd as FileIcon } from "react-icons/ai";

interface Props {
  theme: string;
  dispatch: any;
  data: any;
  handleFileInput: any;
  children: React.Node;
}

function DragAndDrop({
  theme = "primary",
  dispatch,
  data,
  handleFileInput,
  children,
}: Props) {
  const className = useStyles(
    {
      container: {
        dimen: "w-[40rem] h-20",
        padding: "p-4",
        rounded: "rounded-md",
        shadow: "shadow-md",
        hover: "hover:shadow-xl",
        main: `flex flex-col justify-center items-center ${
          data.inDropZone ? "bg-bg" : "bg-gray-100"
        }`,
      },
    },
    {},
    { data }
  );

  // Manage file drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If file is being uploaded or is completed
    if (
      data.response.percent > 0 ||
      data.response.data?.status ||
      data.response.data?.err
    )
      return;

    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (data.dropDepth === 0) return;
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If file is being uploaded or is completed
    if (
      data.response.percent > 0 ||
      data.response.data?.status ||
      data.response.data?.err
    )
      return;

    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      handleFileInput(files);
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  return (
    <div
      className={`${className.container} ${theme}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {data.inDropZone ? (
        <FileIcon className="h-6 w-6 block text-text pointer-events-none" />
      ) : (
        children
      )}
    </div>
  );
}

export default DragAndDrop;
