import React, { forwardRef } from "react"
import Entity from "../Entity"

import Body from "./Body"
import Lens from "./Lens"

const Camera = forwardRef(({ inspect, ...props }, ref) => (
  <Entity noVisual onClick={inspect} {...props} ref={ref}>
    <Lens left="50%" top="0" />
    <Body left="50%" top="100%" />
  </Entity>
))
Camera.name = "Camera"
Camera.templateName = "Camera"
Camera.defaultProps = {
  ...Entity.defaultProps,
  width: 3.5,
  height: 2.25,
  z: 0.5
}

export default Camera
