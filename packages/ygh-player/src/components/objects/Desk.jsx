import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'
import Plank from './Plank'

const DeskPart = styled(PhysicalObject.Part)`
  left: 0; top: 0; right: 0; bottom: 0;

  border-radius: .125em;

  background: repeating-linear-gradient(
    transparent 0%, transparent 20%,
    #333 20%, #333 25%,
    transparent 25%, transparent 75%,
    #333 75%, #333 80%,
    transparent 80%, transparent 100%
  )
`

const StyledPlank = styled(Plank)`
  display: inline-block;
  height: 100%;
  width: 31.3333%;
  margin: 0 1%;

  &:nth-child(1) {
    border-radius: 5% 7% 4% 8% / 50% 60% 40% 70%;
  }

  &:nth-child(2) {
    border-radius: 2% 5% 3% 9% / 40% 50% 70% 20%;
  }

  &:nth-child(3) {
    border-radius: 6% 3% 4% 7% / 20% 80% 40% 60%;
  }
`

const Desk = props => (
  <PhysicalObject width="6em" height="12em">
    <DeskPart {...props} z={2.5}>
      <StyledPlank baseColor="#584630" />
      <StyledPlank baseColor="#584630" />
      <StyledPlank baseColor="#584630" />
    </DeskPart>
  </PhysicalObject>
)

export default Desk

export const objectId = 'desk'
