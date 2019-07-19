import React from "react"
import Icon from "../Icon"

const getD = direction => {
  switch (direction) {
    case "right":
      return "M10 3l13 13-13 13"
    case "left":
      return "M10 3l13 13-13 13"
    case "up":
      return "M10 3l13 13-13 13"
    default:
      return "M3 10l13 13 13-13"
  }
}

export default ({ direction, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path fill="none" d={getD(direction)} />
  </Icon>
)
