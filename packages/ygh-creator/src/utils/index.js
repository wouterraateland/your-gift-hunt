import * as colors from "./colors"
import * as entities from "./entities"
import * as functions from "./functions"
import * as styles from "./styles"

const _ = {
  ...colors,
  ...entities,
  ...functions,
  ...styles,
  trace: v => {
    console.log(v)
    return v
  }
}

export default _
