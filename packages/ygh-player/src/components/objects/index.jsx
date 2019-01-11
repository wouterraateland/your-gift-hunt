import React from 'react'
import styled from 'styled-components'

import * as _SafeWithKeyhole from './SafeWithKeyhole'
import * as _PlantPot from './PlantPot'

const ObjectContainer = styled.div`
  position: absolute;
`

const createPhysicalObject = (Component, id) => (props) => {
  const object = { id }

  return (
    <ObjectContainer object={object}>
      <Component {...props} />
    </ObjectContainer>
  )
}

export const SafeWithKeyhole = createPhysicalObject(_SafeWithKeyhole.default, _SafeWithKeyhole.objectId)
export const PlantPot = createPhysicalObject(_PlantPot.default, _PlantPot.objectId)
