import React, { forwardRef } from "react"
import _ from "ygh-utils"

import Entity from "../../Entity"
import ComputerDetail from "../../EntityDetails/Computer"

import Keyboard from "./Keyboard"
import Standard from "./Standard"
import Mouse from "./Mouse"
import Screen from "./Screen"

const Computer = forwardRef(
  ({ containedEntities, inspect, children, ...props }, ref) => (
    <Entity noVisual {...props} onClick={inspect} ref={ref}>
      <Keyboard left={1.25} bottom={1} rotation={15} />
      <Mouse right={0.5} bottom={1} rotation={-15} />
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
  z: 2,
  width: 4,
  height: 4
}
Computer.states = ["Off", "On"]
Computer.Detail = ComputerDetail

export default Computer
