import React, { useEffect, useRef } from "react";
import useStyles from "@/hooks/useStyles";

interface Props {
  dispatch: any;
  data: any;
  accept: Array<string>;
  maxFileSize: number;
}

function Uploading({ dispatch, data, accept, maxFileSize }: Props) {
  const className = useStyles(
    {
      container: {
        dimen: "w-full h-full",
        main: "grid grid-cols-12 grid-rows-4",
      },
      uploading: {
        main: "block text-primary col-span-8 justify-self-start row-start-1",
      },
      message: {
        error: data.response.err ? "text-primary danger" : "text-gray-400",
        main: "block text-sm col-span-8 justify-self-start row-start-3",
      },
      percent: {
        font: "font-bold text-xl",
        position: "right-0",
        opacity: "opacity-50",
        main: "text-primary col-start-12 row-start-2",
      },
      loadingBar: {
        dimen: "h-1",
        rounded: `${
          data.response.percent === 100 ? "rounded-br-md" : "rounded-r-md"
        } rounded-bl-md`,
        position: "absolute bottom-0 left-0",
        main: "bg-card",
      },
    },
    {},
    { data }
  );
  const loadingBarRef = useRef();

  useEffect(() => {
    if (data.response.percent <= 100) {
      loadingBarRef.current.style = `width: ${String(data.response.percent)}%;`;
    }
  }, [data.response.percent]);

  // Response is completed, update mode
  useEffect(() => {
    const status = data.response?.data?.status;
    if (status === 200) dispatch({ type: "SET_MODE", payload: 1 });
  }, [data.response, dispatch]);

  return (
    <div className={className.container}>
      {/* Uploading */}
      <span className={className.uploading}>Uploading</span>
      {/* Message */}
      <span className={className.message}>
        {data.response.err
          ? "An error has occurred, upload the file again"
          : `${printTypes(accept)} files up to ${maxFileSize} in size`}
      </span>
      {/* Percent */}
      <span className={className.percent}>{data.response.percent}%</span>
      {/* Loading Bar */}
      <span ref={loadingBarRef} className={className.loadingBar}></span>
    </div>
  );
}

export default Uploading;
