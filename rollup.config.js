import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import typescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");
const extensions = ["js", "jsx", "ts", "tsx", "mjs"];
const external = ["react", "react-dom"];

process.env.BABEL_ENV = "production";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs", //CommonJs
      sourcemap: false,
    },
    {
      file: packageJson.module,
      format: "esm", //ES Modules
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({
      extensions,
      include: ["./src/**/*"],
      exclude: /node_modules/,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    image(),
  ],
  external,
};
