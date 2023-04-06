import React, { useRef, useEffect } from "react";
import useStyles from "@/hooks/useStyles";
// Components
import Badge from "@/components/atoms/Badge";
// Icons
import { FaDivide as DefaultIcon } from "react-icons/fa";
import { FcGraduationCap as ParamIcon1 } from "react-icons/fc";
import { HiPencil as ParamIcon2 } from "react-icons/hi";

interface Props {
  theme: string;
  styles: any;
  badges: Array<string>;
  title: string;
  description: string;
  percent: number;
  onClick: (e: any) => void;
  children: React.Node;
}

function Island({
  theme = "primary",
  styles = {},
  badges = [],
  title,
  description,
  percent = 0,
  onClick = (e) => undefined,
  children,
}: Props) {
  const className = useStyles(
    {
      container: {
        dimen: "w-96",
        rounded: "rounded-md",
        padding: percent >= 99 ? "p-5 pt-10" : "p-5",
        position: "relative",
        main: "bg-primary text-prim-text flex items-start flex-col",
      },
      iconContainer: {
        dimen: "w-28 h-28",
        rounded: "rounded-bl-[100%]",
        position: "absolute top-0 right-0",
        main: "bg-white/20 flex place-content-center",
      },
      progressBar: {
        padding: "px-5 py-1",
        rounded: percent >= 99 ? "rounded-tr-md" : "",
        font: "text-[0.8rem] text-left rounded-tl-md",
        position: "absolute top-0 left-0",
        main: "block w-full bg-primary success",
      },
      title: {
        font: "text-2xl",
        main: "block text-left",
      },
      description: {
        margin: "mt-1",
        font: "text-md",
      },
      buttonsContainer: {
        margin: "mt-5",
        main: "flex",
      },
      button: {
        hover: "hover:bg-white/10",
        border: "border-solid border-prim-text border-2",
        margin: "mr-8",
        padding: "py-2 px-6",
        font: "text-sm",
        rounded: "rounded",
      },
      param: {
        margin: "mr-2",
        main: "flex items-center",
      },
    },
    styles,
    { percent }
  );
  // refs
  const progressBarRef = useRef();

  // progress bar width
  useEffect(() => {
    const progressBar = () => {
      progressBarRef.current.style.width = `${percent}%`;
    };
    progressBar();
  }, [percent]);

  return (
    <div className={`${className.container} ${theme}`}>
      <div className={className.iconContainer}>
        {children?.icon ? (
          children.icon
        ) : (
          <DefaultIcon className="w-8 h-8 text-prim-text/80 mt-8 ml-8" />
        )}
      </div>
      {/* Progress bar */}
      <span ref={progressBarRef} className={className.progressBar}>
        {percent <= 33 ? `${percent}%` : `Progress ${percent}%`}
      </span>
      {/* Badges */}
      <div className={className.badges}>
        {badges.map((badge) => (
          <Badge
            text={badge}
            styles={{
              badge: {
                margin: "mr-2",
                padding: "p-1",
                font: "text-xs",
                main: "bg-primary success",
              },
            }}
          />
        ))}
      </div>
      {/* Title */}
      <h3 className={className.title}>{title}</h3>
      {/* Description */}
      <p className={className.description}>{description}</p>
      {/* Buttons and Params */}
      <div className={className.buttonsContainer}>
        <button onClick={onClick} className={className.button}>
          Open
        </button>
        {children?.params ? (
          children.params.map((p) => (
            <span className={className.param}>
              {p.icon} {p.text}
            </span>
          ))
        ) : (
          <>
            <span className="mr-4 flex items-center">
              <ParamIcon1 className="w-4 h-4 mr-2 text-prim-text" /> Params
            </span>
            <span className="flex items-center">
              <ParamIcon2 className="w-4 h-4 mr-2 text-prim-text" /> Params
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Island;
