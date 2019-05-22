import * as colors from "./colors"
import * as entities from "./entities"
import * as functionals from "./functionals"
import * as functions from "./functions"
import * as graph from "./graph"
import * as styles from "./styles"

const _ = {
  ...colors,
  ...entities,
  ...functionals,
  ...functions,
  ...graph,
  ...styles,
  trace: v => {
    console.log(v)
    return v
  }
}

export default _
