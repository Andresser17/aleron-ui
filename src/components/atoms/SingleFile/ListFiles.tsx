import React from "react";
import { ReducerAction, ReducerActionKind, ReducerState } from "./reducer";
// Hooks
import useStyles from "@/hooks/useStyles";
// Helpers
import { convertToUnit } from "./helpers";
// Icons
import { AiFillFileAdd as FileIcon } from "react-icons/ai";

interface Props {
  dispatch: React.Dispatch<ReducerAction>;
  data: ReducerState;
  deleteFiles: () => void;
  uploadFiles: () => void;
  fileInputRef: React.Ref<HTMLInputElement>;
}

function ListFiles({
  data,
  uploadFiles,
  deleteFiles,
  fileInputRef,
  dispatch,
}: Props) {
  const className = useStyles(
    {
      container: {
        dimen: "w-full h-full",
        position: "relative",
        main: "grid grid-cols-12 grid-rows-2",
      },
      fileSize: {
        main: "block col-span-8 justify-self-start row-start-1",
      },
      fileSizeUnit: {
        main: "text-gray-400",
      },
      message: {
        font: "text-sm",
        main: "block text-primary col-span-8 justify-self-start self-end row-start-2",
      },
      icon: {
        dimen: "w-10 h-10",
        padding: "p-3",
        margin: "mr-6",
        rounded: "rounded-[50%]",
        main: "block bg-black/5 flex justify-center items-center row-span-2 col-start-12",
      },
    },
    {},
    {}
  );

  const handleDeleteFile = (fileUploaded) => {
    if (fileUploaded) deleteFiles(data.file);
    dispatch({ type: ReducerActionKind.DELETE_FILE, payload: null });
  };

  if (!data.file) return <div></div>;

  return (
    <div className={className.container}>
      {/* File size */}
      <span className={className.fileSize}>
        {data.file.name}{" "}
        <span className={className.fileSizeUnit}>
          {convertToUnit(data.file.size)}
        </span>
      </span>
      {/* Message */}
      <span className={className.message}>
        {/* File Uploaded */}
        {data.response?.data?.status === 200 ? (
          <button
            onClick={() => handleDeleteFile(true)}
            className="text-primary"
          >
            Delete File
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                if (fileInputRef && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Select file
            </button>
            <button onClick={uploadFiles} className="ml-3">
              Upload
            </button>
            <button
              onClick={() => handleDeleteFile(false)}
              className="text-primary ml-3 danger"
            >
              Delete
            </button>
          </>
        )}
      </span>
      <span className={className.icon}>
        <FileIcon className="text-primary" />
      </span>
    </div>
  );
}

export default ListFiles;
