import * as functions from "./functions"
import * as colors from "./colors"
import * as entities from "./entities"

const _ = {
  ...functions,
  ...colors,
  ...entities,
  log: v => {
    console.log(v)
    return v
  }
}

export default _
