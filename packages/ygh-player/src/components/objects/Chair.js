import React, { memo } from 'react'
import styled from 'styled-components'

import Draggable, { dragStyles } from 'components/Draggable'

const s = 4;

const Chair = styled.div`
  position: relative;

  width: 24vw;
  height: 20vw;

  border-radius: 2vw;

  background:
    linear-gradient(90deg, rgba(0, 0, 0, .5), transparent, transparent, rgba(0, 0, 0, .2), rgba(0, 0, 0, .7), rgba(0, 0, 0, .2), transparent, transparent, rgba(0, 0, 0, .5)),
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0,
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) ${s}vw ${s}vw,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) ${s}vw 0,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 ${s}vw,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) ${s}vw 0,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) ${2 * s}vw ${s}vw,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) ${s}vw ${s}vw,
    linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0,
    linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;

  &::before, &::after {
    content: '';
    position: absolute;

    background:
      radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0,
      radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) ${s}vw ${s}vw,
      radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) ${s}vw 0,
      radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 ${s}vw,
      radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) ${s}vw 0,
      radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) ${2 * s}vw ${s}vw,
      radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
      radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) ${s}vw ${s}vw,
      linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0,
      linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;
  }

  &, &::before, &::after {
    background-color: #300;
    background-size: ${2 * s}vw ${2 * s}vw;
  }

  &::after {
    left: 4vw;
    right: 4vw; bottom: 0;

    height: 4vw;
    border-radius: 1vw;

    box-shadow:
      inset 0 -1vw 1vw rgba(0, 0, 0, .6),
      inset 0 1vw 1vw rgba(0, 0, 0, .6),
      0 -1vw 4vw 2vw rgba(0, 0, 0, .7);
  }

  &::before {
    left: 4vw; top: -1vw;
    right: 4vw; bottom: 4vw;

    border-radius: 2vw;

    box-shadow:
      inset 0 1.5vw 3vw rgba(0, 0, 0, .2),
      inset .5vw 0 1vw rgba(0, 0, 0, .4),
      inset 1.5vw 0 3vw rgba(0, 0, 0, .2),
      inset -.5vw 0 1vw rgba(0, 0, 0, .4),
      inset -1.5vw 0 3vw rgba(0, 0, 0, .2),
      inset 0 .5vw 1vw rgba(0, 0, 0, .4) !important;
  }

  ${dragStyles(1.5)}
`

export default () => {
  return (
    <Draggable
      id={`chair`}
      persistent
      rotates
      initialTranslation={{ x: 70, y: 88 }}
      initialRotation={(-1 / 6) * Math.PI}
      component={memo(dragProps => (
        <Chair
          {...dragProps}
        />
      ))}
    />
  )
}
