import React, { forwardRef } from "react"
import Entity from "../../Entity"

import Body from "./Body"
import Lens from "./Lens"

const Camera = forwardRef(({ inspect, children, ...props }, ref) => (
  <Entity noVisual onClick={inspect} {...props} ref={ref}>
    <Lens left="50%" top="0" />
    <Body left="50%" top="100%" />
    {children}
  </Entity>
))
Camera.name = "Camera"
Camera.templateName = "Camera"
Camera.defaultProps = {
  ...Entity.defaultProps,
  width: 3.5,
  height: 2.25,
  z: 1
}

export default Camera
