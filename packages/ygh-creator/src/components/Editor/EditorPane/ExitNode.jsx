import React from "react"
import ExitState from "../ExitState"

const ExitNode = ({ position: { left, top } }) => (
  <ExitState
    style={{
      left: `${left + 96}px`,
      top: `${top}px`
    }}
  />
)

export default ExitNode
