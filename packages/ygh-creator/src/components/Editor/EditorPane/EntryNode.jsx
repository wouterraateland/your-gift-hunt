import React from "react"
import EntryState from "../EntryState"

const EntryNode = ({ position: { left, top } }) => (
  <EntryState
    style={{
      left: `${left + 96}px`,
      top: `${top + 112}px`
    }}
  />
)

export default EntryNode
