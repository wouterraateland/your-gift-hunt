import React from "react"
import Icon from "./Icon"

export default props => (
  <Icon viewBox="0 0 32 32" {...props}>
    <g strokeWidth={2} fill="none">
      <path d="M8 21H5V5h16v3" strokeDasharray="5,3" />
      <path d="M11 18.333V11h16v16H11z" />
    </g>
  </Icon>
)
