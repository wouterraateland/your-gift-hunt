import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'
import Plank from './Plank'

const PLANK_COUNT = 8

const FloorPart = styled(PhysicalObject.Part)`
  left: 0; top: 0;
  right: 0; bottom: 0;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const StyledPlank = styled(Plank)`
  position: relative;
  height: ${props => 100 * props.height}%;
  width: ${100 / PLANK_COUNT}%;
`

const divideOne = n => {
  const parts = (new Array(n)).fill(0).map(() => .1 + .9 * Math.random())
  const sum = parts.reduce((acc, x) => acc + x, 0)
  return parts.map(x => x / sum)
}

const Floor = props => {
  const [planks, setPlanks] = useState([])

  useEffect(() => {
    setPlanks(Array(PLANK_COUNT).fill(0)
      .flatMap(() => divideOne(2 + Math.floor(2 * Math.random()))))
  }, [])

  return (
    <PhysicalObject width="28em" height="28em">
      <FloorPart {...props} z={0}>
        {planks.map((plank, i) => (
          <StyledPlank
            key={i}
            as={PhysicalObject.Part}
            z={0}
            height={plank}
          />
        ))}
      </FloorPart>
    </PhysicalObject>
  )
}

export default Floor

export const objectId = 'floor'
