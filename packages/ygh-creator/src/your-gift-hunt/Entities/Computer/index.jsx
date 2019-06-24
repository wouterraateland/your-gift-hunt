import React, { forwardRef } from "react"
import _ from "utils"

import Entity from "../Entity"

import Keyboard from "./Keyboard"
import Standard from "./Standard"
import Mouse from "./Mouse"
import Screen from "./Screen"

const Computer = forwardRef(
  ({ children, containedEntities, inspect, ...props }, ref) => (
    <Entity noVisual {...props} onClick={inspect} ref={ref}>
      <Keyboard left={1.25} top={3} rotation={15} />
      <Mouse left={3.5} top={3} rotation={-15} />
      <Standard left="50%" top={0.75}>
        <Screen
          left="50%"
          top={0.5}
          state={{
            name: containedEntities.some(
              _.or(_.hasState("unanswered"), _.hasState("empty"))
            )
              ? "on"
              : "off"
          }}
        />
      </Standard>
      {children}
    </Entity>
  )
)
Computer.name = "Computer"
Computer.templateName = "Computer screen"
Computer.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 4,
  height: 4
}

export default Computer
