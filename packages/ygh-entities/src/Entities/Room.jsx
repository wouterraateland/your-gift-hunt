import React, { forwardRef } from "react"

import Entity from "../Entity"
import Floor from "./Floor"
import Wall from "./Wall"

const Room = forwardRef(({ children, ...props }, ref) => (
  <Entity noVisual {...props} ref={ref}>
    <Floor
      isReachable={props.isReachable}
      width={props.width}
      height={props.height}
      color={props.color}
    />
    {children}
    <Wall
      isReachable={props.isReachable}
      width={props.width + 1}
      height={props.height + 1}
    />
  </Entity>
))
Room.name = "Room"
Room.templateName = "Room"
Room.defaultProps = {
  ...Entity.defaultProps,
  z: 5,
  width: 29,
  height: 35,
  color: "#b38d5c"
}

export default Room
