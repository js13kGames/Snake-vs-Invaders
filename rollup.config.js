import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
//import livereload from 'rollup-plugin-livereload';
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/index.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "public/bundle.js"
    },
    plugins: [
      svelte({
        dev: !production,
        css: css => {
          css.write("public/bundle.css");
        }
      }),

      resolve({ browser: true, preferBuiltins: false }),
      typescript({
        cacheRoot: `${require("temp-dir")}/.rpt2_cache`,
        tsconfig: "tsconfig.json"
      }),

      commonjs(),

      production && terser(),

      sourceMaps()
    ],
    watch: {
      clearScreen: false
    }
  }
];
