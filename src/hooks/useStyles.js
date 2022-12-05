import React, { useMemo } from "react";

function applyCustom(styles = {}, custom = {}) {
  for (const [tag, properties] of Object.entries(custom)) {
    if (!styles[tag]) continue;

    styles[tag] = { ...styles[tag], ...properties };
  }

  return styles;
}

function useStyles(componentStyles = {}, custom = {}, params = {}) {
  const className = useMemo(() => {
    const className = {};
    const styles =
      Object.keys(custom).length > 0
        ? applyCustom(componentStyles, custom)
        : componentStyles;

    for (const [tag, properties] of Object.entries(styles)) {
      const cssArr = [];

      for (const [prop, css] of Object.entries(properties)) {
        // call function and pass params as argument
        if (typeof css === "function") {
          cssArr.push(css(params));
          continue;
        }
        cssArr.push(css);
      }

      className[tag] = cssArr.join(" ");
    }

    return className;
  }, [componentStyles, custom, params]);

  return className;
}

export default useStyles;
