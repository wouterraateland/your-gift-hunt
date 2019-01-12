import React from 'react'
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

export const Armchair = createPhysicalObject(_Armchair.default, _Armchair.objectId)
export const Camera = createPhysicalObject(_Camera.default, _Camera.objectId)
export const Carpet = createPhysicalObject(_Carpet.default, _Carpet.objectId)
export const Computer = createPhysicalObject(_Computer.default, _Computer.objectId)
export const Desk = createPhysicalObject(_Desk.default, _Desk.objectId)
export const DeskChair = createPhysicalObject(_DeskChair.default, _DeskChair.objectId)
export const Door = createPhysicalObject(_Door.default, _Door.objectId)
export const Floor = createPhysicalObject(_Floor.default, _Floor.objectId)
export const Grass = createPhysicalObject(_Grass.default, _Grass.objectId)
export const InstructionNote = createPhysicalObject(_InstructionNote.default, _InstructionNote.objectId)
export const Lamp = createPhysicalObject(_Lamp.default, _Lamp.objectId)
export const Mailbox = createPhysicalObject(_Mailbox.default, _Mailbox.objectId)
export const Package = createPhysicalObject(_Package.default, _Package.objectId)
export const Path = createPhysicalObject(_Path.default, _Path.objectId)
export const PlantPot = createPhysicalObject(_PlantPot.default, _PlantPot.objectId)
export const SafeWithKeyhole = createPhysicalObject(_SafeWithKeyhole.default, _SafeWithKeyhole.objectId)
export const Sink = createPhysicalObject(_Sink.default, _Sink.objectId)
export const Wall = createPhysicalObject(_Wall.default, _Wall.objectId)
