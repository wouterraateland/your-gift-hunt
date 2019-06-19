import React, { forwardRef } from "react"

import Entity from "./Entity"
import Floor from "./Floor"
import Wall from "./Wall"

const Room = forwardRef(({ children, ...props }, ref) => (
  <Entity noVisual {...props} ref={ref}>
    <Floor isReachable={props.isReachable} />
    {children}
    <Wall isReachable={props.isReachable} />
  </Entity>
))
Room.name = "Room"
Room.templateName = "Room"
Room.defaultProps = {
  ...Entity.defaultProps,
  z: 5,
  width: 29,
  height: 35
}

export default Room
