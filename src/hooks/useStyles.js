import React, { useMemo } from "react";

function extractValues(obj, tag, prop) {
  if (Object.keys(obj).length > 0) {
    if (!obj[tag]) return undefined;
    return obj[tag][prop];
  }
}

function useStyles(styles = {}, custom = {}, params = {}) {
  const className = useMemo(() => {
    const className = {};

    for (const [tag, properties] of Object.entries(styles)) {
      const cssArr = [];

      for (const [prop, css] of Object.entries(properties)) {
        const customCSS = extractValues(custom, tag, prop);
        // call function and pass params as argument
        if (typeof customCSS === "function") {
          cssArr.push(customCSS(params));
          continue;
        }
        // replace styles properties with custom properties
        if (customCSS) {
          cssArr.push(customCSS);
          continue;
        }
        cssArr.push(css);
      }

      className[tag] = cssArr.join(" ");
    }

    return className;
  }, [styles, custom, params]);

  return className;
}

export default useStyles;
