import SplitPane from "./SplitPane"
import Pane from "./Pane"
import Divider from "./Divider"
import { HORIZONTAL, VERTICAL } from "./constants"

export { SplitPane, Pane, Divider, HORIZONTAL, VERTICAL }

SplitPane.Pane = Pane
SplitPane.Divider = Divider
SplitPane.HORIZONTAL = HORIZONTAL
SplitPane.VERTICAL = VERTICAL
export default SplitPane
