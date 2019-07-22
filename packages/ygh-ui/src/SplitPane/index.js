import SplitPane from "./SplitPane"
import Pane from "./Pane"
import Resizer from "./Resizer"
import { HORIZONTAL, VERTICAL } from "./constants"

export { SplitPane, Pane, Resizer, HORIZONTAL, VERTICAL }

SplitPane.Pane = Pane
SplitPane.Resizer = Resizer
SplitPane.HORIZONTAL = HORIZONTAL
SplitPane.VERTICAL = VERTICAL
export default SplitPane
