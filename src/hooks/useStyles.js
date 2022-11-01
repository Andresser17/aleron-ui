import React, { useMemo } from "react";

function useStyles(
  styles = {},
  protectedStyles = {},
  custom = {},
  params = {}
) {
  const className = useMemo(() => {
    if (Object.keys(custom).length > 0) {
      for (const [key, value] of Object.entries(custom)) {
        if (typeof value === "function") {
          custom[key] = value(params);
        }
      }

      const className = { ...styles, ...custom, ...protectedStyles };
      return Object.keys(className)
        .map((key) => className[key])
        .join(" ");
    }

    const className = { ...styles, ...protectedStyles };
    return Object.keys(className)
      .map((key) => className[key])
      .join(" ");
  }, [styles, custom, protectedStyles]);

  return className;
}

export default useStyles;
