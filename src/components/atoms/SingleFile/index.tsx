import React, { useEffect, useRef, useReducer } from "react";
import reducer from "./reducer";
// Components
import DragAndDrop from "./DragAndDrop";
import Uploading from "./Uploading";
import ListFiles from "./ListFiles";
// Hooks
import useStyles from "@/hooks/useStyles";
// Helpers
import { printTypes } from "./helpers";
import moduleStyles from "./SingleFile.module.css";

function Modes({
  dispatch,
  data,
  uploadFiles,
  onDelete,
  fileInputRef,
  accept,
  maxFileSize,
}) {
  const className = useStyles(
    {
      container: {
        dimen: "w-full h-full",
        main: "grid grid-cols-12 grid-rows-4",
      },
      selectFile: {
        main: "block text-primary col-span-8 justify-self-start row-start-1",
      },
      message: {
        font: `${
          data.error.code === 1 ? "text-bg danger" : "text-gray-400"
        } text-sm`,
        main: "block col-span-8 justify-self-start row-start-3",
      },
    },
    {}
  );

  // List Files
  if (data.mode === 1)
    return (
      <ListFiles
        dispatch={dispatch}
        data={data}
        uploadFiles={uploadFiles}
        deleteFiles={onDelete}
        fileInput={fileInputRef}
      />
    );

  // Uploading
  if (data.mode === 2)
    return (
      <Uploading
        {...{ dispatch, data }}
        accept={accept}
        maxFileSize={maxFileSize}
      />
    );

  return (
    <div className={className.container}>
      <span className={className.selectFile}>Select or drag a file</span>
      {/* Message */}
      <span className={className.message}>
        {data.error.code === 1
          ? data.error.message
          : `${printTypes(accept)} files up to ${maxFileSize} in size`}
      </span>
    </div>
  );
}

interface Props {
  theme: string;
  maxFileSize: string;
  accept: Array<string>;
  onUpload: () => void;
  onDelete: () => void;
}

function SingleFile({
  palette = "primary",
  maxFileSize,
  accept,
  onUpload,
  onDelete,
}: Props) {
  const [data, dispatch] = useReducer(reducer, {
    file: undefined,
    mode: 0,
    dropDepth: 0,
    inDropZone: false,
    error: { code: 0, message: "" },
    response: { percent: 0, data: undefined, err: undefined },
  });
  // Refs
  const fileInputRef = useRef();

  // Read file
  const handleFileInput = (files) => {
    const [file] = files;
    if (!file) return;

    // Compare maxFileSize with new input file size
    if (file.size > calcFileSize(maxFileSize)) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          code: 1,
          message: `The file weight more than ${maxFileSize}`,
        },
      });
      return false;
    }

    // Check if fileType is accepted
    if (!accept.includes(file.type)) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          code: 1,
          message: `${file.type} file type is not accepted`,
        },
      });
      return false;
    }

    if (data.file?.name === file.name) return;

    // Update data.file
    dispatch({ type: "ADD_FILE", payload: file });

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 1 });
  };

  // Upload File
  const uploadFiles = () => {
    const formData = new FormData();
    formData.set("file", data.file);

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 2 });

    // Pass file to handle prop
    onUpload(formData, (response) => {
      dispatch({
        type: "SET_RESPONSE",
        payload: response,
      });
    });
  };

  const resetComponent = () => {
    dispatch({
      type: "SET_RESPONSE",
      payload: { percent: 0, data: undefined, err: undefined },
    });
    dispatch({ type: "SET_MODE", payload: 0 });
    dispatch({ type: "SET_ERROR", payload: { code: 0, message: "" } });
  };

  // Reset mode
  useEffect(() => {
    if (!data.file && data.mode > 0) resetComponent();
  }, [data.file, data.mode]);

  // Reset error state
  useEffect(() => {
    if (data.error.code > 0 || data.response.err) {
      setTimeout(resetComponent, 1000 * 5);
    }
  }, [data.error, data.response.err]);

  return (
    <DragAndDrop {...{ dispatch, data, handleFileInput, palette }}>
      <Modes data={data} />
      <input
        data-testid="upload-input"
        ref={fileInputRef}
        onChange={(e) => handleFileInput([...e.target.files])}
        className={`${moduleStyles["custom-file-input"]} ${
          data.file ? "al-hidden" : ""
        }`}
        type="file"
        id="myFile"
        name="filename"
      />
    </DragAndDrop>
  );
}

export default SingleFile;
