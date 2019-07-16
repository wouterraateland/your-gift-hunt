import React from "react"
import Icon from "./Icon"

export default props => (
  <Icon viewBox="0 0 32 32" {...props}>
    <g strokeWidth={2} fill="none">
      <path d="M22 27H11V11h16v16h-5z" strokeDasharray="5,3" />
      <path d="M8 21H5V5h16v3" />
    </g>
  </Icon>
)
