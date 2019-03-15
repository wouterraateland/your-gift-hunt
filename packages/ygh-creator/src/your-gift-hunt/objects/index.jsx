import React from "react"
import S from "sanctuary"

import ObjectContainer from "./ObjectContainer"

import Armchair from "./Armchair"
import Camera from "./Camera"
import Carpet from "./Carpet"
import Computer from "./Computer"
import Desk from "./Desk"
import DeskChair from "./DeskChair"
import Door from "./Door"
import Floor from "./Floor"
import Grass from "./Grass"
import InstructionNote from "./InstructionNote"
import Lamp from "./Lamp"
import Mailbox from "./Mailbox"
import Package from "./Package"
import Path from "./Path"
import PlantPot from "./PlantPot"
import SafeWithKeyhole from "./SafeWithKeyhole"
import SafeWithCode from "./SafeWithCode"
import Sink from "./Sink"
import Wall from "./Wall"

export const getObjectComponent = name => {
  switch (name) {
    case "Armchair":
      return S.Just(Armchair)
    case "Camera":
      return S.Just(Camera)
    case "Carpet":
      return S.Just(Carpet)
    case "Computer":
      return S.Just(Computer)
    case "Desk":
      return S.Just(Desk)
    case "Desk chair":
      return S.Just(DeskChair)
    case "Door":
      return S.Just(Door)
    case "Floor":
      return S.Just(Floor)
    case "Grass":
      return S.Just(Grass)
    case "Instruction note":
      return S.Just(InstructionNote)
    case "Lamp":
      return S.Just(Lamp)
    case "Mailbox":
      return S.Just(Mailbox)
    case "Package":
      return S.Just(Package)
    case "Path":
      return S.Just(Path)
    case "Plant pot":
      return S.Just(PlantPot)
    case "Safe with keyhole":
      return S.Just(SafeWithKeyhole)
    case "Safe with code":
      return S.Just(SafeWithCode)
    case "Sink":
      return S.Just(Sink)
    case "Wall":
      return S.Just(Wall)
    default:
      return S.Nothing
  }
}

const GenericObject = props =>
  S.compose(
    S.maybe_(() => props.entity.name)(Component => (
      <ObjectContainer {...Component}>
        <Component {...props} />
      </ObjectContainer>
    ))
  )(getObjectComponent)(props.entity.name)

export default GenericObject

export {
  Armchair,
  Camera,
  Carpet,
  Computer,
  Desk,
  DeskChair,
  Door,
  Floor,
  Grass,
  InstructionNote,
  Lamp,
  Mailbox,
  Package,
  Path,
  PlantPot,
  SafeWithKeyhole,
  SafeWithCode,
  Sink,
  Wall
}
