import React, { forwardRef } from "react"

import Entity from "../Entity"

import Keyboard from "./Keyboard"
import Standard from "./Standard"
import Mouse from "./Mouse"
import Screen from "./Screen"

const Computer = forwardRef(({ state, inspect, ...props }, ref) => (
  <Entity noVisual {...props} onClick={inspect} ref={ref}>
    <Keyboard left={1.25} top={3} rotation={15} />
    <Mouse left={3.5} top={3} rotation={-15} />
    <Standard left="50%" top={0.75}>
      <Screen left="50%" top={0.5} state={state} />
    </Standard>
  </Entity>
))
Computer.name = "Computer"
Computer.templateName = "Computer"
Computer.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 4,
  height: 4
}

export default Computer
