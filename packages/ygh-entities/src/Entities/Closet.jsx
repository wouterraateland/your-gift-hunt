import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import ClosetDetail from "../EntityDetails/Closet"

import plankStyles from "../plankStyles"

const StyledCloset = styled(Entity)`
  ${plankStyles}

  &, &::before, &::after {
    border-radius: 0.125em 0 0 0.125em;
  }
`

const LeftDoor = styled(Entity)`
  ${plankStyles}

  &, &::before, &::after {
    border-radius: 0 0.125em 0.125em 0;
  }
`
LeftDoor.defaultProps = {
  ...Entity.defaultProps,
  width: 0.5,
  origin: { left: "0%", top: "0%" }
}

const RightDoor = styled(Entity)`
  ${plankStyles}

  &, &::before, &::after {
    border-radius: 0 0.125em 0.125em 0;
  }
`
RightDoor.defaultProps = {
  ...Entity.defaultProps,
  width: 0.5,
  origin: { left: "0%", top: "100%" }
}

const Closet = forwardRef(({ inspect, children, ...props }, ref) => (
  <StyledCloset {...props} baseColor={props.color} onClick={inspect} ref={ref}>
    <LeftDoor
      baseColor={props.color}
      right={-0.5}
      top={0}
      height={props.height / 2}
      rotation={_.hasState("Unlocked")(props) ? -60 : 0}
    />
    <RightDoor
      baseColor={props.color}
      right={-0.5}
      top={props.height}
      height={props.height / 2}
      rotation={_.hasState("Unlocked")(props) ? 60 : 0}
    />
    {children}
  </StyledCloset>
))
Closet.name = "Closet"
Closet.templateName = "Closet"
Closet.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 8,
  color: "#F2DFDA"
}
Closet.states = ["Locked", "Unlocked"]
Closet.Detail = ClosetDetail

export default Closet
