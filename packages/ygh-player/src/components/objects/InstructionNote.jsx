import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Note = styled(PhysicalObject.Part)`
  width: 2em;
  height: 3em;
  padding: .25em;

  perspective: 100px;
  transform-style: preserve-3d;
`

const Paper = styled.div`
  position: absolute;
  left: 0; top: 0;
  right: 0; bottom: 0;

  background: #f5f0d7;

  transform: rotate3d(0, 0, 1, 0deg);
`

const PaperClip = styled.div`
  position: absolute;
  right: .3em;
  top: -.1em;

  width: .3em;
  height: 1em;

  border: .05em solid #999;
  border-radius: .15em .15em .1em .1em;

  transform: rotate3d(1, 10, 0, -5deg);
`

const PaperClip2 = styled.div`
    position: absolute;
    right: .3em;
    top: .1em;

    width: .2em;
    height: .8em;

    border-left: .05em solid #999;
    border-bottom: .05em solid #999;
    border-radius: 0 0 .1em .1em;

    box-shadow:
      inset .05em -.05em .1em -.05em #0004,
      .05em .05em .1em #0004;
  }
`

const Text = styled.span`
  display: inline-block;

  white-space: nowrap;

  font-family: cursive;
  font-size: .6em;

  transform: translate(-.5em, 1em) rotate(90deg);
`

const InstructionNote = props => (
  <PhysicalObject width={2} height={3} {...props}>
    <Note {...props} z={.1}>
      <Paper />
      <PaperClip />
      <PaperClip2 />
      <Text>Read me</Text>
    </Note>
  </PhysicalObject>
)

export default InstructionNote

export const objectId = 'instruction-note'
