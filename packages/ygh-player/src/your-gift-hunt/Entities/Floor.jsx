import React, { forwardRef, useMemo } from "react"
import styled from "styled-components"

import Entity from "./Entity"
import plankStyles from "./plankStyles"

const FloorContainer = styled(Entity)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
FloorContainer.displayName = "Floor.Container"

const Plank = styled.div`
  ${plankStyles}
`
Plank.defaultProps = {
  baseColor: "#b38d5c"
}

const PLANK_COUNT = 10
const divideOne = n => {
  const parts = new Array(n).fill(0).map(() => 0.1 + 0.9 * Math.random())
  const sum = parts.reduce((acc, x) => acc + x, 0)
  return parts.map(x => x / sum)
}

const Floor = forwardRef(({ children, ...props }, ref) => {
  const plankHeights = useMemo(
    () =>
      Array(PLANK_COUNT)
        .fill(0)
        .flatMap(() => divideOne(2 + Math.floor(2 * Math.random()))),
    []
  )

  return (
    <FloorContainer {...props} ref={ref}>
      {plankHeights.map((plankHeight, i) => (
        <Plank
          key={i}
          style={{
            width: `${100 / PLANK_COUNT}%`,
            height: `${100 * plankHeight}%`
          }}
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
  z: 0,
  width: 29,
  height: 35
}

export default Floor
