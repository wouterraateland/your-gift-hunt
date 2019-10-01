import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"
import plankStyles from "../plankStyles"

const Construction = styled(Entity)`
  z-index: -1;

  border-radius: 0.125em;

  background: repeating-linear-gradient(
    transparent 0%,
    transparent 20%,
    #333 20%,
    #333 25%,
    transparent 25%,
    transparent 75%,
    #333 75%,
    #333 80%,
    transparent 80%,
    transparent 100%
  );
`

const Plank = styled(Entity)`
  ${plankStyles}

  margin: 0 1%;

  &,
  &::before {
    border-radius: ${props => {
      switch (props.i) {
        case 1:
          return "5% 7% 4% 8% / 50% 60% 0.2em 70%"
        case 2:
          return "2% 5% 3% 9% / 0.2em 50% 70% 20%"
        default:
          return "6% 3% 4% 7% / 20% 0.2em 40% 0.2em"
      }
    }};
  }
`
Plank.defaultProps = {
  z: 0,
  height: "100%",
  width: "31%"
}

const Desk = forwardRef(({ children, ...props }, ref) => (
  <Construction noVisual ref={ref} {...props}>
    <Plank color={props.color} left="18%" i={1} />
    <Plank color={props.color} i={2} />
    <Plank color={props.color} left="82%" i={3} />
    <Entity noVisual width={props.width} height={props.height} z={3}>
      {children}
    </Entity>
  </Construction>
))
Desk.name = "Desk"
Desk.templateName = "Desk"
Desk.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 6,
  height: 12,
  color: "#584630"
}

export default Desk
