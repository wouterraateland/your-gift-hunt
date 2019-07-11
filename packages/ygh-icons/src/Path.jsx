import React from "react"
import Icon from "./Icon"

export default props => (
  <Icon viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="14.5" strokeWidth="3" fill="none" />
    <path
      d="M 7 16.5 C 12 25.5 19 26.5 21.5 22 C 24 17.5 13.5 20.5 16.5 14"
      strokeDasharray="2"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 19 7 L 13.5 12.5 M 13.5 7 L 19 12.5"
      strokeWidth="2"
      fill="none"
    />
  </Icon>
)
