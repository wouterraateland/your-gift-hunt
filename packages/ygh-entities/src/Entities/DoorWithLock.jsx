import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import DoorWithLockDetail from "../EntityDetails/DoorWithLock"

const Frame = styled(Entity)`
  &,
  &::before {
    border-radius: 60% 40% 50% 80% / 0.15em 0.1em 0.15em 0.1em;
  }
  &::before {
    width: 100%;
    height: 100%;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4,
      inset 0 -0.2em 0.4em -0.1em #0004;

    background: #567796;
  }

  &::after {
    left: -0.5em;
    top: -0.25em;
    bottom: -0.25em;

    width: 0.5em;
    border-radius: 0.2em 0.1em 0.1em 0.1em / 0.3em 0.2em 0.1em 0.5em;

    box-shadow: 5.5em 0 #000;

    background: #000;
  }
`

const DoorPart = styled(Entity)`
  border-radius: 60% 40% 0.2em 80% / 0.2em 0.2em 0.3em 0.1em;

  background: #584630;

  transition: transform 1s ease-in-out;

  &::before {
    left: 0;
    bottom: 0;

    width: 0.5em;
    height: 0.5em;
    border-radius: 100% 90% 90% 110%;

    background: #000;

    transform: translate(-50%, 50%) rotate(344deg);
  }
`
DoorPart.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: "100%",
  height: 0.5,
  origin: { left: "0%", top: "100%" }
}

const DoorWithLock = forwardRef(({ inspect, children, ...props }, ref) => {
  const isOpen = _.hasState("Unlocked")(props)
  return (
    <Frame {...props} onClick={inspect} ref={ref}>
      <DoorPart left={0} top={0.75} rotation={isOpen ? 60 : 0} />
      {children}
    </Frame>
  )
})
DoorWithLock.name = "DoorWithLock"
DoorWithLock.templateName = "Door with lock"
DoorWithLock.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 5,
  height: 1
}
DoorWithLock.states = ["Closed", "Open"]
DoorWithLock.Detail = DoorWithLockDetail

export default DoorWithLock
