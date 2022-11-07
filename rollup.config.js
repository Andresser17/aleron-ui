import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import includePaths from "rollup-plugin-includepaths";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json"];
const config = [
  {
    external: ["react", "react-dom"],
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      excludeDependenciesFromBundle(),
      external({ includeDependencies: false }),
      includePaths({
        include: {},
        paths: ["src"],
        external: [],
        extensions: [".js", ".json", ".html"],
      }),
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
      url(),
      svgr(),
      babel({
        babelrc: false,
        babelHelpers: "bundled",
        exclude: "**/node_modules/**",
        extensions: EXTENSIONS,
        presets: [
          ["@babel/preset-env", { modules: false }],
          "@babel/preset-react",
        ],
      }),
      commonjs({
        include: /node_modules/,
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true,
      }),
      nodeResolve({
        extensions: EXTENSIONS,
        preferBuiltins: false,
      }),
      terser(),
    ],
  },
];

export default config;
