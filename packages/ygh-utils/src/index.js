import * as colors from "./colors"
import * as entities from "./entities"
import * as functions from "./functions"
import * as functionals from "./functionals"
import * as math from "./math"
import * as store from "./store"
import * as styles from "./styles"

const _ = {
  ...colors,
  ...entities,
  ...functions,
  ...functionals,
  ...math,
  ...store,
  ...styles,
  trace: v => {
    console.log(v)
    return v
  }
}

export default _
