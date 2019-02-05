import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'
import Plank from './Plank'

const Construction = styled(PhysicalObject.Part)`
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: -1;

  border-radius: .125em;

  background: repeating-linear-gradient(
    transparent 0%, transparent 20%,
    #333 20%, #333 25%,
    transparent 25%, transparent 75%,
    #333 75%, #333 80%,
    transparent 80%, transparent 100%
  )
`
Construction.displayName = 'Desk.Construction'

const StyledPlank = styled(Plank)`
  position: relative;
  left: 0; top: 0;
  display: inline-block;
  height: 100%;
  width: 31.3333%;
  margin: 0 1%;

  &:nth-child(2),
  &:nth-child(2)::before {
    border-radius: 5% 7% 4% 8% / 50% 60% .2em 70%;
  }

  &:nth-child(3),
  &:nth-child(3)::before {
    border-radius: 2% 5% 3% 9% / .2em 50% 70% 20%;
  }

  &:nth-child(4),
  &:nth-child(4)::before {
    border-radius: 6% 3% 4% 7% / 20% .2em 40% .2em;
  }
`
StyledPlank.displayName = 'Desk.StyledPlank'

const Desk = props => (
  <PhysicalObject width={6} height={12} {...props}>
    <Construction z={0} />
    <StyledPlank
      as={PhysicalObject.Part} baseColor="#584630" z={2.5} />
    <StyledPlank
      as={PhysicalObject.Part} baseColor="#584630" z={2.5} />
    <StyledPlank
      as={PhysicalObject.Part} baseColor="#584630" z={2.5} />
  </PhysicalObject>
)
Desk.entityName = 'Desk'

export default Desk
