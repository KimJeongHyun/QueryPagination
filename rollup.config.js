import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");
const external = ["react", "react-dom"];

process.env.BABEL_ENV = "production";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm", //ES Modules
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      image(),
    ],
    external,
  },
  {
    input: "dist/QueryPagination/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
