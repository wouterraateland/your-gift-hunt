import React, { memo } from "react"
import styled from "styled-components"

import ObjectPart from "./ObjectPart"
import Plank from "./Plank"

const PLANK_COUNT = 10
const divideOne = n => {
  const parts = new Array(n).fill(0).map(() => 0.1 + 0.9 * Math.random())
  const sum = parts.reduce((acc, x) => acc + x, 0)
  return parts.map(x => x / sum)
}

const planks = Array(PLANK_COUNT)
  .fill(0)
  .flatMap(() => divideOne(2 + Math.floor(2 * Math.random())))

const FloorContainer = styled(ObjectPart)`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
FloorContainer.displayName = "Floor.Container"

const FloorPlank = memo(styled(Plank).attrs(props => ({
  style: {
    height: `${100 * props.height}%`
  }
}))`
  position: relative;
  width: ${100 / PLANK_COUNT}%;
`)
FloorPlank.displayName = "Floor.Plank"

const Floor = () => {
  return (
    <FloorContainer z={0}>
      {planks.map((plank, i) => (
        <FloorPlank key={i} as={ObjectPart} z={0} height={plank} />
      ))}
    </FloorContainer>
  )
}
Floor.entityName = "Floor"
Floor.width = 29
Floor.height = 35

export default Floor
