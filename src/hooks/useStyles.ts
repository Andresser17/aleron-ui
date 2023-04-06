import React, { useMemo } from "react";

interface Styles {
  [key: string]: { [key: string]: string | Function };
}

function applyCustom(styles: Styles, custom: Styles) {
  for (const [tag, properties] of Object.entries(custom)) {
    if (!styles[tag]) continue;

    styles[tag] = { ...styles[tag], ...properties };
  }

  return styles;
}

function useStyles(
  componentStyles: Styles,
  custom: Styles,
  params: { [key: string]: any }
) {
  const className = useMemo(() => {
    const className: { [key: string]: string } = {};
    const styles =
      Object.keys(custom).length > 0
        ? applyCustom(componentStyles, custom)
        : componentStyles;

    for (const [tag, properties] of Object.entries(styles)) {
      const cssArr = [];

      for (const prop of Object.keys(properties)) {
        const css = properties[prop];
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
