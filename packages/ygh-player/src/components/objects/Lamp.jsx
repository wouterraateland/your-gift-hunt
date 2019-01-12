import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const LampPart = styled(PhysicalObject.Part)`

`

const Lamp = props => (
  <PhysicalObject width="2em" height="2em">
    <LampPart {...props} z={2} />
  </PhysicalObject>
)

export default Lamp

export const objectId = 'lamp'
