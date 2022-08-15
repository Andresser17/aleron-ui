import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import includePaths from "rollup-plugin-includepaths";
import commonjs from "@rollup/plugin-commonjs";

const includePathOptions = {
  include: {},
  paths: ["src/components"],
  external: [],
  extensions: [".js", ".json", ".html"],
};

const config = [
  {
    input: "./src/index.js",
    output: [
      { file: "dist/index.js", format: "cjs" },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      includePaths(includePathOptions),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "**/node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),
      external(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
];

export default config;
