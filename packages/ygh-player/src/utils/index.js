import * as colors from "./colors"
import * as entities from "./entities"
import * as functions from "./functions"
import * as math from "./math"
import * as styles from "./styles"

const _ = {
  ...colors,
  ...entities,
  ...functions,
  ...math,
  ...styles,
  trace: v => {
    console.log(v)
    return v
  }
}

export default _
