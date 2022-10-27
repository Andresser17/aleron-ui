import React, { useMemo } from "react";

function useStyles(styles = {}, protectedStyles = {}, custom = {}) {
  const className = useMemo(() => {
    const className = Object.keys(custom)
      ? { ...styles, ...custom, ...protectedStyles }
      : { ...styles, ...protectedStyles };

    return Object.keys(className)
      .map((key) => className[key])
      .join(" ");
  }, [styles, custom, protectedStyles]);

  return className;
}

export default useStyles;
