const toolTipRoot = document.createElement("div")
toolTipRoot.id = "tooltip-root"

const withToolTipRoot = story => {
  document.body.appendChild(toolTipRoot)
  return story()
}

export default withToolTipRoot
