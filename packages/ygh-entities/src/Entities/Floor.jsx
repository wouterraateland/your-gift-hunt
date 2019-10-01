import React, { forwardRef, useMemo } from "react"
import styled from "styled-components"

import Entity from "../Entity"
import plankStyles from "../plankStyles"

const FloorContainer = styled(Entity)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  &::after {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;

    opacity: ${props => (props.isReachable ? 0 : 1)};

    background-color: #000;
  }
`
FloorContainer.displayName = "Floor.Container"

const Plank = styled.div`
  ${plankStyles}
`

const divideOne = n => {
  const parts = new Array(n).fill(0).map(() => 0.1 + 0.9 * Math.random())
  const sum = parts.reduce((acc, x) => acc + x, 0)
  return parts.map(x => x / sum)
}

const Floor = forwardRef(({ children, ...props }, ref) => {
  const plankCount = Math.ceil(props.width / 3)
  const plankHeights = useMemo(
    () =>
      Array(plankCount)
        .fill(0)
        .flatMap(() => divideOne(2 + Math.floor(2 * Math.random()))),
    [plankCount]
  )

  return (
    <FloorContainer {...props} ref={ref}>
      {plankHeights.map((plankHeight, i) => (
        <Plank
          key={i}
          style={{
            width: `${100 / plankCount}%`,
            height: `${100 * plankHeight}%`
          }}
          color={props.color}
        />
      ))}
      {children}
    </FloorContainer>
  )
})
Floor.name = "Floor"
Floor.templateName = "Floor"
Floor.defaultProps = {
  ...Entity.defaultProps,
  isContainer: true,
  z: 0,
  width: 29,
  height: 35,
  color: "#b38d5c"
}

export default Floor
