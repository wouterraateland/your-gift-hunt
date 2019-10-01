import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"
import PlannerDetail from "../EntityDetails/Planner"

const Backdrop = styled(Entity)`
  padding: 0.25em;
  border-radius: 0.25em;

  background: currentColor;
`

const Paper = styled.div`
  position: absolute;
  left: 0.125em;
  top: 0.125em;
  right: 0.125em;

  height: ${props => props.height}em;

  box-shadow: 0 0.125em 0.375em -0.125em #0006;

  background: #f5f0d7;
`

const Text = styled.span`
  position: absolute;
  left: 50%;
  top: calc(50% - 0.5em);

  white-space: nowrap;

  font-size: 0.6em;

  transform: translate(-50%, -50%) rotate(90deg);

  -webkit-touch-callout: none;
  user-select: none;

  color: #000c;
`

const Planner = forwardRef(({ inspect, children, ...props }, ref) => (
  <Backdrop {...props} onClick={inspect} ref={ref}>
    <Paper height={props.height - 0.25} />
    <Paper height={props.height - 0.5} />
    <Paper height={props.height - 0.75} />
    <Text>Plans</Text>
    {children}
  </Backdrop>
))
Planner.name = "Planner"
Planner.templateName = "Planner"
Planner.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 3,
  color: "#754C3D"
}
Planner.states = ["One", "Two", "Three"]
Planner.Detail = PlannerDetail

export default Planner
