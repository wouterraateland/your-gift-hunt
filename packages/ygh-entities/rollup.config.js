import nodeResolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import replace from "rollup-plugin-replace"
import { sizeSnapshot } from "rollup-plugin-size-snapshot"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

const input = "src/Entities/index.jsx"
const name = pkg.name
const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "styled-components": "styled",
  polished: "polished"
}

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true
}

const commonjsOptions = {
  include: /node_modules/,
  namedExports: {
    "../ygh-ui/node_modules/google-maps-react/dist/index.js": [
      "GoogleApiWrapper",
      "Map",
      "Circle"
    ]
  }
}

const nodeResolveOptions = {
  preferBuiltins: false,
  extensions: [".js", ".jsx", ".json"]
}

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: "umd",
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeResolveOptions),
      postcss(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      sizeSnapshot(),
      terser()
    ]
  },
  {
    input,
    output: { file: pkg.module, format: "esm" },
    // prevent bundling all dependencies
    external: id => !id.startsWith(".") && !id.startsWith("/"),
    plugins: [
      nodeResolve(nodeResolveOptions),
      postcss(),
      babel(babelOptions),
      sizeSnapshot()
    ]
  }
]
