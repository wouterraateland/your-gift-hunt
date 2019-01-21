import React, { memo, Children, cloneElement, useContext } from 'react'
import styled from 'styled-components'

import GameContext from 'contexts/Game'

import _Armchair from './Armchair'
import _Camera from './Camera'
import _Carpet from './Carpet'
import _Computer from './Computer'
import _Desk from './Desk'
import _DeskChair from './DeskChair'
import _Door from './Door'
import _Floor from './Floor'
import _Grass from './Grass'
import _InstructionNote from './InstructionNote'
import _Lamp from './Lamp'
import _Mailbox from './Mailbox'
import _Package from './Package'
import _Path from './Path'
import _PlantPot from './PlantPot'
import _SafeWithKeyhole from './SafeWithKeyhole'
import _Sink from './Sink'
import _Wall from './Wall'

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

const createPhysicalObject = Component => memo(({
  children,
  angle=0,
  parentAngle=0,
  ...props
}) => {
  const { instances: { objects } } = useContext(GameContext)

  const instance = Component.entityId
    ? objects.find(o => o.entity.id === Component.entityId)
    : null

  const childrenWithParentAngle = Children.map(children, child =>
    cloneElement(child, { parentAngle: parentAngle + angle })
  )

  return (
    <ObjectContainer angle={angle} {...props}>
      <Component
        {...instance}
        parentAngle={angle + parentAngle}
      />
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
