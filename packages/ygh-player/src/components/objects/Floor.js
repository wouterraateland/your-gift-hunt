import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'

const Floor = styled.div`
  position: absolute;
  left: 0; top: 0;
  right: 0; bottom: 0;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  background-image: radial-gradient(#D1A46B, #B57744);

  &::before {
    content: '';

    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    background-image:
      linear-gradient(90deg, rgba(255, 255, 255, .014) 50%, transparent 50%),
      linear-gradient(90deg, rgba(255, 255, 255, .015) 50%, transparent 50%),
      linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, .02) 50%),
      linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, .02) 50%);

    background-size: 13px, 29px, 37px, 53px;
  }
`

const Plank = styled.div`
  width: ${100 / 6}%;
  height: ${props => 100 * props.height}%;

  box-shadow:
    inset .5vw 0 .25vw rgba(255, 255, 255, .1),
    inset -.5vw 0 .25vw rgba(0, 0, 0, .1),
    inset 0 -.25vw .125vw rgba(0, 0, 0, .1);
`

const divideOne = n => {
  const parts = (new Array(n)).fill(0).map(Math.random)
  const sum = parts.reduce((acc, x) => acc + x, 0)
  return parts.map(x => x / sum)
}

export default memo(() => {
  const [planks, setPlanks] = useState([])

  useEffect(() => {
    setPlanks([1, 2, 3, 4, 5, 6]
      .flatMap(() => divideOne(2 + Math.floor(2 * Math.random()))))
  }, [])

  return (
    <Floor>
      {planks.map((plank, i) => <Plank key={i} height={plank} />)}
    </Floor>
  )
})
