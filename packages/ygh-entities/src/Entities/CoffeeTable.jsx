import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"
import plankStyles from "../plankStyles"

const Construction = styled(Entity)`
  z-index: -1;

  border-radius: 0.125em;

  background: repeating-linear-gradient(
        transparent 0%,
        transparent 10%,
        #333 10%,
        #333 15%,
        transparent 15%,
        transparent 85%,
        #333 85%,
        #333 90%,
        transparent 90%,
        transparent 100%
      )
      no-repeat center / 2em ${props => props.height}em,
    radial-gradient(circle 2em, #333 96%, transparent 100%);
`

const Plank = styled(Entity)`
  ${plankStyles}

  margin: 0 1%;

  &,
  &::before {
    border-radius: ${props => {
      switch (props.i) {
        case 1:
          return "200% 0 0 200% / 50% 0 0 50%"
        case 3:
          return "0 200% 200% 0 / 0 50% 50% 0"
        default:
          return "0"
      }
    }};
  }
`
Plank.defaultProps = {
  z: 0,
  height: "100%",
  width: "31%"
}

const CoffeeTable = forwardRef(({ children, ...props }, ref) => (
  <Construction noVisual ref={ref} {...props}>
    <Plank color={props.color} left="18%" i={1} />
    <Plank color={props.color} i={2} />
    <Plank color={props.color} left="82%" i={3} />
    <Entity noVisual width={props.width} height={props.height} z={3}>
      {children}
    </Entity>
  </Construction>
))
CoffeeTable.name = "CoffeeTable"
CoffeeTable.templateName = "Coffee Table"
CoffeeTable.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 6,
  height: 10,
  color: "#967C5B"
}

export default CoffeeTable
