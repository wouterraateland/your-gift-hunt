import React, { memo, Children, cloneElement } from 'react'
import styled from 'styled-components'

import * as _Armchair from './Armchair'
import * as _Camera from './Camera'
import * as _Carpet from './Carpet'
import * as _Computer from './Computer'
import * as _Desk from './Desk'
import * as _DeskChair from './DeskChair'
import * as _Door from './Door'
import * as _Floor from './Floor'
import * as _Grass from './Grass'
import * as _InstructionNote from './InstructionNote'
import * as _Lamp from './Lamp'
import * as _Mailbox from './Mailbox'
import * as _Package from './Package'
import * as _Path from './Path'
import * as _PlantPot from './PlantPot'
import * as _SafeWithKeyhole from './SafeWithKeyhole'
import * as _Sink from './Sink'
import * as _Wall from './Wall'

const ObjectContainer = styled.div.attrs(props => ({
  style: {
    left: `${props.left}em`,
    top: `${props.top}em`,
    transform: `rotate(${props.angle}deg)`
  }
}))`
  position: absolute;
  pointer-events: none;
`

ObjectContainer.defaultProps = {
  left: 0, top: 0,
  angle: 0,
}

const createPhysicalObject = ({ default: Component, objectId: id }) =>
  memo(({ children, state, angle=0, parentAngle=0, ...props }) => {
  const object = { id }

  const childrenWithParentAngle = Children.map(children, child =>
    cloneElement(child, { parentAngle: parentAngle + angle })
  )

  return (
    <ObjectContainer object={object} angle={angle} {...props}>
      <Component state={state} parentAngle={angle + parentAngle} />
      {childrenWithParentAngle}
    </ObjectContainer>
  )
})

export const Armchair = createPhysicalObject(_Armchair)
export const Camera = createPhysicalObject(_Camera)
export const Carpet = createPhysicalObject(_Carpet)
export const Computer = createPhysicalObject(_Computer)
export const Desk = createPhysicalObject(_Desk)
export const DeskChair = createPhysicalObject(_DeskChair)
export const Door = createPhysicalObject(_Door)
export const Floor = createPhysicalObject(_Floor)
export const Grass = createPhysicalObject(_Grass)
export const InstructionNote = createPhysicalObject(_InstructionNote)
export const Lamp = createPhysicalObject(_Lamp)
export const Mailbox = createPhysicalObject(_Mailbox)
export const Package = createPhysicalObject(_Package)
export const Path = createPhysicalObject(_Path)
export const PlantPot = createPhysicalObject(_PlantPot)
export const SafeWithKeyhole = createPhysicalObject(_SafeWithKeyhole)
export const Sink = createPhysicalObject(_Sink)
export const Wall = createPhysicalObject(_Wall)
