import React from "react";
// Hooks
import useStyles from "@/hooks/useStyles";
// Icons
import { AiFillFileAdd as FileIcon } from "react-icons/ai";

interface Props {
  data: any;
  uploadFiles: Array<any>;
  deleteFiles: Array<any>;
  fileInput: any;
  dispatch: any;
}

function ListFiles({
  data,
  uploadFiles,
  deleteFiles,
  fileInput,
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
    {}
  );

  const handleDeleteFile = (fileUploaded) => {
    if (fileUploaded) deleteFiles(data.file);
    dispatch({ type: "DELETE_FILE" });
  };

  if (!data.file) return;

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
            <button onClick={() => fileInput.current.click()}>
              Select file
            </button>
            <button onClick={uploadFiles} className="ml-3">
              Upload
            </button>
            <button
              onClick={() => handleDeleteFile()}
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
